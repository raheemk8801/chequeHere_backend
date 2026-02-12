import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import supplierRoutes from "./routes/supplier.route.js";
import employeeRoutes from "./routes/employee.route.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

/**
 * MIDDLEWARES
 */
app.use(cors());
app.use(express.json());

/**
 * SOCKET.IO SETUP
 */
const io = new Server(server, {
  cors: {
    origin: "*", // restrict later in prod
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
});

// Make io available globally (for future controllers if needed)
app.set("io", io);

/**
 * SOCKET CONNECTION HANDLER
 */
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  // Example listener (optional)
  socket.on("ping", () => {
    socket.emit("pong");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});


app.use("/api/suppliers", supplierRoutes);
app.use("/api/employees", employeeRoutes);


/**
 * HEALTH CHECK (optional but useful)
 */
app.get("/", (req, res) => {
  res.send("Socket.IO server is running 🚀");
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

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
