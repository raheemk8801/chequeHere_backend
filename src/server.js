import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";

// Routes
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

/**
 * MIDDLEWARES
 */
app.use(
  cors({
    origin: "http://localhost:5173", // adjust later in prod
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  }),
);
app.use(express.json());

// ✅ Clerk middleware (must be before protected routes)
app.use(clerkMiddleware());

/**
 * SOCKET.IO SETUP
 */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // restrict later in prod
    methods: ["GET", "POST"],
  },
});

// Make io available globally (for future controllers if needed)
app.set("io", io);

/**
 * SOCKET CONNECTION HANDLER
 */
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("ping", () => {
    socket.emit("pong");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

/**
 * ROUTES
 */
app.use((err, req, res, next) => {
  console.error("🔥 API Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.get("/", (req, res) => {
  res.send("Socket.IO server is running 🚀");
});

// ✅ Users API (Mongo write: test/users)
app.use("/api/users", userRoutes);

/**
 * START SERVER
 */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
