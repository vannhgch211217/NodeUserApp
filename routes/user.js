const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/checkout', async (req, res) => {
    try {
        const { email, classIds } = req.body; 

        if (!email || !Array.isArray(classIds) || classIds.length === 0) {
            return res.status(400).send({ message: "Email and class IDs are required." });
        }
        const newUser = new User({
            email: email,
            classIds: classIds,
        });

        await newUser.save();

        return res.status(201).send({ message: "User registered successfully", user: newUser });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.get('/allMyClass', async (req, res) => {
    try {
        const classes = await User.find(); 
        return res.status(200).send(classes); 
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

module.exports = router;
