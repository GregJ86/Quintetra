const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel')

router.put("/icon/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const { newIcon } = req.body;


        // Find user
            const user = await newUserModel.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.icon = newIcon;
        await user.save();




        return res.json( { message: "Icon updated", icon: user.icon});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});


module.exports = router;
