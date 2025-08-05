const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel')

router.put("/gold/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { newGold } = req.body; 

    if (typeof newGold !== "number") {
      return res.status(400).json({ message: "Invalid gold value" });
    }

    // Find user
    const user = await newUserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
   
      user.gold = newGold;
      await user.save();
      return res.json({ message: "Gold updated", gold: user.gold });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;
