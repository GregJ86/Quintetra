const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel')

router.put("/highscore/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { newHighScore } = req.body; 

    if (typeof newHighScore !== "number") {
      return res.status(400).json({ message: "Invalid high score value" });
    }

    // Find user
    const user = await newUserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only if newHighScore is higher than existing
    if (newHighScore > (user.highScore || 0)) {
      user.highScore = newHighScore;
      await user.save();
      return res.json({ message: "High score updated", highScore: user.highScore });
    } else {
      return res.json({ message: "High score not updated", highScore: user.highScore });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;
