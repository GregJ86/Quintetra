const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel')

router.put("/level/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { newLevel } = req.body; 

    if (typeof newLevel !== "number") {
      return res.status(400).json({ message: "Invalid level value" });
    }

    // Find user
    const user = await newUserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
   
      user.level = newLevel;
      await user.save();
      return res.json({ message: "Level updated", level: user.level });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;
