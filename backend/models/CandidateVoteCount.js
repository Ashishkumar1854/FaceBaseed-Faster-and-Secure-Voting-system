const mongoose = require("mongoose");
const Vote = require("./Vote");

const candidateVoteCountSchema = new mongoose.Schema({
  candidate: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

candidateVoteCountSchema.statics.updateVoteCounts = async function () {
  const counts = await Vote.aggregate([
    { $group: { _id: "$candidate", count: { $sum: 1 } } },
  ]);

  await this.deleteMany({});

  if (counts.length === 0) return;

  const bulkOps = counts.map(({ _id, count }) => ({
    updateOne: {
      filter: { candidate: _id },
      update: { candidate: _id, count },
      upsert: true,
    },
  }));

  await this.bulkWrite(bulkOps);
};

module.exports = mongoose.model("CandidateVoteCount", candidateVoteCountSchema);
