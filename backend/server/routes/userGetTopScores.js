const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel')


router.get("/topScores", async (req, res) => {
    try {
      const topUsers = await newUserModel.find({}, "username highScore")
      .sort({ highScore: -1 })
      .limit(5);

    res.json(topUsers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;