const express = require("express");
const ComplaintModel = require("../models/complaint");
const upload = require("../middleware/multerMiddleware");
const { authMiddleware } = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");


const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  upload.array("proof",5),
  async (req, res) => {
    try {
      console.log("User date in request", req.user);

      const { model, complaintType, place, district, date, time } = req.body;

      if (!model || !complaintType || !place || !district || !date || !time) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const proofFiles = req.files?.map((file) => file.path) || [];

      const complaint = new ComplaintModel({
        model,
        complaintType,
        place,
        district,
        date,
        time,
        proof:proofFiles, // Store Cloudinary URL
        user: req.user.userId, // Attach logged-in user's ID
      });

      await complaint.save();
      res
        .status(201)
        .json({ message: "Complaint submitted successfully", complaint });
    } catch (error) {
      console.error("Error submiting complaint", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.get("/my-complaints", authMiddleware, async (req, res) => {
  try {
    const complaints = await ComplaintModel.find({ user: req.user.userId })
      .select("-__v")
      .lean(); // Removes unnecessary Mongoose overhead


    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


router.delete("/my-complaints-delete/:id", authMiddleware, async (req, res) => {
  try {
    const complaintId = req.params.id;
    const userId = req.user.userId; // Get logged-in user ID

    // Find the complaint
    const complaint = await ComplaintModel.findOne({ _id: complaintId, user: userId });
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found or unauthorized" });
    }

    // Delete proof files from Cloudinary
    if (complaint.proof && complaint.proof.length > 0) {
      for (const fileUrl of complaint.proof) {
        const publicId = fileUrl.split("/").pop().split(".")[0]; // Extract Cloudinary public_id
        await cloudinary.uploader.destroy(`complaints/${publicId}`); // Delete from Cloudinary
      }
    }

    // Delete complaint from MongoDB
    await ComplaintModel.findByIdAndDelete(complaintId);

    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Error deleting complaint:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



module.exports = router;
