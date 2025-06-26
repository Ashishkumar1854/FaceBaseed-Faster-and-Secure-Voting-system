require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Sync counts on server start
    const CandidateVoteCount = require("./models/CandidateVoteCount");
    await CandidateVoteCount.updateVoteCounts();
    console.log("Candidate vote counts synced on startup");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
