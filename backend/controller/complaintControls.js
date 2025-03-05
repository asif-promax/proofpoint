const express = require("express");
const ComplaintModel = require("../models/complaintModel");

const router = express.Router();

/** ✅ Create a new complaint model with types */
router.post("/add", async (req, res) => {
  try {
    const { models, complaintTypes } = req.body;
    if (!models || complaintTypes.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingModel = await ComplaintModel.findOne({ models });
    if (existingModel) {
      return res
        .status(400)
        .json({ message: "Complaint model already exists" });
    }

    const complaintModel = new ComplaintModel({ models, complaintTypes });
    await complaintModel.save();
    res
      .status(201)
      .json({ message: "Complaint model added successfully", complaintModel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/** ✅ Get all complaint models */
router.get("/all", async (req, res) => {
  try {
    const model = await ComplaintModel.find();
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/** ✅ Update a complaint model */
router.put("/update/:id", async (req, res) => {
  try {
    const { models, complaintTypes } = req.body;
    const updatedModel = await ComplaintModel.findByIdAndUpdate(
      req.params.id,
      { models, complaintTypes },
      { new: true }
    );

    if (!updatedModel) {
      return res.status(404).json({ message: "Complaint model not found" });
    }

    res.json({ message: "Complaint model updated successfully", updatedModel });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/** ✅ Delete a complaint model */
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedModel = await ComplaintModel.findByIdAndDelete(req.params.id);
    if (!deletedModel) {
      return res.status(404).json({ message: "Complaint model not found" });
    }
    res.json({ message: "Complaint model deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/remove-type/:id", async (req, res) => {
  try {
    const { typeToRemove } = req.body;
    const updatedModel = await ComplaintModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { complaintTypes: typeToRemove } }, // Removes the type from the array
      { new: true }
    );

    if (!updatedModel) {
      return res.status(404).json({ message: "Complaint model not found" });
    }

    res.json({
      message: "Complaint type removed successfully",
      updatedModel,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
