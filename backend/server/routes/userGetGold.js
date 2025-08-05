const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel')


router.get("/gold/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const user = await newUserModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ gold: user.gold });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;