const User = require("../models/User");
const Vote = require("../models/Vote");
const CandidateVoteCount = require("../models/CandidateVoteCount");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Use static method from model to update counts
async function updateCandidateVoteCounts() {
  await CandidateVoteCount.updateVoteCounts();
}

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password, address, image } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      address,
      image,
    });
    await user.save();
    res.json({ success: true, message: "✅ User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ success: false, message: "❌ Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Vote Submission (Add Vote)
exports.vote = async (req, res) => {
  try {
    const { candidate } = req.body;
    if (!candidate) {
      return res
        .status(400)
        .json({ success: false, message: "Candidate is required" });
    }

    // Check if user already voted
    const existingVote = await Vote.findOne({ user: req.user.id });
    if (existingVote) {
      return res
        .status(400)
        .json({ success: false, message: "You have already voted" });
    }

    // Save the vote
    const newVote = new Vote({ user: req.user.id, candidate });
    await newVote.save();

    // Update vote counts dynamically
    await updateCandidateVoteCounts();

    res.json({ success: true, message: "✅ Vote cast successfully" });
  } catch (error) {
    console.error("Vote Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Vote (for admin or user undo vote)
exports.deleteVote = async (req, res) => {
  try {
    const { userId } = req.params;

    // Delete vote by userId param
    const deletedVote = await Vote.findOneAndDelete({ user: userId });
    if (!deletedVote) {
      return res
        .status(404)
        .json({ success: false, message: "Vote not found" });
    }

    // Update counts after deletion
    await updateCandidateVoteCounts();

    res.json({ success: true, message: "Vote deleted and counts updated" });
  } catch (error) {
    console.error("Delete Vote Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Check if user already voted
exports.checkVote = async (req, res) => {
  try {
    const { userId } = req.params;
    const voted = await Vote.findOne({ user: userId });
    res.json({ success: true, voted: !!voted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Results
exports.getResults = async (req, res) => {
  try {
    const results = await CandidateVoteCount.find().sort({ count: -1 });
    const totalVotes = results.reduce((sum, c) => sum + c.count, 0);
    res.json({ success: true, totalVotes, results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get user info by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      user: { name: user.name, address: user.address, image: user.image },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching user data" });
  }
};

// Verify User (Face Match)
exports.verifyUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    const user = await User.findOne({ name });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      message: "User verified successfully",
      user_data: { name: user.name, address: user.address, image: user.image },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
