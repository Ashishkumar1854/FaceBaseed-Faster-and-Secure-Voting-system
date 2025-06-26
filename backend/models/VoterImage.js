const mongoose = require("mongoose");

const voterImageSchema = new mongoose.Schema({
  voter_id: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  imagePath: { type: String }, // Path where the image is stored
});

module.exports = mongoose.model("VoterImage", voterImageSchema);
