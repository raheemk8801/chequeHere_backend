import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    email: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
