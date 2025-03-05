const express = require("express");
const User = require("../models/user");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch all users (Only Admins can access this)
router.get("/users", authMiddleware, async (req, res) => {
  try {
    console.log("Fetching users...");
    const users = await User.find({}, "-password");
    console.log("Users found:", users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/deleteusers/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({message:"server error",error:error.message})
  }
});

module.exports = router;
