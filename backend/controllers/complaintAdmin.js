const express = require("express");
const ComplaintModel = require("../models/complaint");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Route 1: Get All Complaints (With Pagination & Status Filter)
router.get("/all-complaints", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get page number from query, default to 1
    const limit = 10; // Number of complaints per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip
    const statusFilter = req.query.status; // Get status filter (optional)

    const query = {}; // Initialize query object
    if (
      statusFilter &&
      ["solved", "rejected", "pending"].includes(statusFilter)
    ) {
      query.status = statusFilter;
    }

    // Get total count of complaints
    const totalComplaints = await ComplaintModel.countDocuments(query);

    // Fetch complaints with pagination, sorted by latest
    const allComplaints = await ComplaintModel.find(query)
      .populate("user", "email number")
      .sort({ createdAt: -1 }) // Latest complaints first
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      complaints: allComplaints,
      totalPages: Math.ceil(totalComplaints / limit), // Calculate total pages
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 📌 Route 2: Update Complaint Status (Admin Only)
router.patch("/update-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const complaintId = req.params.id;

    // Check if the provided status is valid
    if (!["solved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Update complaint status
    const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res
      .status(200)
      .json({ message: `Complaint marked as ${status}`, updatedComplaint });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
module.exports = router;