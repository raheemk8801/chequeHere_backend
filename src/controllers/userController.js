import User from "../models/userModel.js";
import { getAuth } from "@clerk/express";

export const syncUser = async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Missing email" });

    const user = await User.findOneAndUpdate(
      { user_id: userId },
      { $set: { email } },
      { upsert: true, new: true },
    );

    res.status(200).json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
