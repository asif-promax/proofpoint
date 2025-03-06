const express = require("express");
const ComplaintModel = require("../models/complaint");
const router = express.Router();

router.get("/dashboard-stats", async (req, res) => {
  try {
    const totalCases = await ComplaintModel.countDocuments();
    const verifiedCases = await ComplaintModel.countDocuments({ status: "solved" });
    const pendingCases = await ComplaintModel.countDocuments({ status: "pending" });
    const rejectedCases = await ComplaintModel.countDocuments({ status: "rejected" });

    // Fetch complaints count per month
    const monthlyStats = await ComplaintModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } // Sort by month
    ]);

    // Map month number to short names
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const activityData = monthNames.map((month, index) => ({
      month,
      cases: monthlyStats.find(stat => stat._id === index + 1)?.count || 0
    }));

    res.json({
      totalCases,
      verifiedCases,
      pendingCases,
      rejectedCases,
      activityData
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
