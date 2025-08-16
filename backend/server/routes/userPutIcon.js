const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel')

router.put("/user/:id/icon", async (req, res) => {
    try {
        const { icon } = req.body;


        // Find user
        const user = await newUserModel.findByIdAndUpdate(req.params.id,
            { icon },
            { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }




        return res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
});


module.exports = router;
