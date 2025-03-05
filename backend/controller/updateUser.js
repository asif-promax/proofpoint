const express = require("express");
const User = require("../models/user");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Update User Profile
router.put("/updateusers/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, number, email } = req.body;

    // Ensure only the logged-in user can update their own profile
    if (req.user.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to update this profile" });
    }

    if (!name || !number || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, number, email },
      { new: true, runValidators: true }
    ).select("-password"); // Select fields after update

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch User Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
