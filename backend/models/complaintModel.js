const mongoose = require("mongoose");

const complaintsModelSchema = new mongoose.Schema({
  models: { type: String, required: true, unique: true },
  complaintTypes: [{ type: String }],
});

module.exports = mongoose.model("ComplaintModel", complaintsModelSchema);
