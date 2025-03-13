const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    model: { type: String, required: true },
    complaintType: { type: String, required: true },
    place: { type: String, required: true },
    district: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    proof: [{ type: String }], // Store multiple Cloudinary URLs
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference the User model
    status: {
      type: String,
      enum: ["pending", "solved", "rejected"],
      default: "pending",
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);
