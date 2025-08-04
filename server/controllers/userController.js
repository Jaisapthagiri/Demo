// controllers/userController.js
import User from '../models/User.js';

export const getApplicants = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
