const express = require("express");
const router = express.Router();
const Voter = require("../models/Voter");

router.post("/add-image", async (req, res) => {
  const { voter_id, image_filename } = req.body;

  if (!voter_id || !image_filename) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    let voter = await Voter.findOne({ voter_id });

    if (!voter) {
      voter = new Voter({ voter_id, image_filename });
    } else {
      voter.image_filename = image_filename;
    }

    await voter.save();
    res.json({ success: true, message: "Metadata saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
