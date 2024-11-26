const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Class = require('../models/Class'); 

// Get all 
router.get('/allClasses', async (req, res) => {
    try {
        const classes = await Class.find(); 
        return res.status(200).send(classes); 
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.post('/syncClasses', async (req, res) => {
    try {
        await Class.deleteMany({});

        const classes = req.body; 

        const classesWithNumberId = classes.map(cls => ({
            ...cls,
            courseId: Number(cls.courseId) 
        }));

        await Class.insertMany(classesWithNumberId);

        return res.status(200).send({ message: "Classes synced successfully" });
    } catch (error) {
        console.error("Error during class sync:", error);
        return res.status(500).send({ message: error.message }); 
    }
});

module.exports = router;
