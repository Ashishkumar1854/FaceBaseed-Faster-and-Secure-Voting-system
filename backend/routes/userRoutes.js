const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  vote,
  deleteVote,
  getResults,
  checkVote,
  getUserById,
  verifyUser,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ success: true, message: "This is your profile", user: req.user });
});

router.post("/vote", authMiddleware, vote);

router.delete("/vote/:userId", authMiddleware, deleteVote);

router.get("/results", authMiddleware, getResults);

router.get("/check-vote/:userId", checkVote);

router.get("/:id", getUserById);

router.post("/verify", verifyUser);

module.exports = router;
