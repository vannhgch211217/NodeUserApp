const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/allCourses', async (req, res) => {
    try {
        const courses = await Course.find(); 
        return res.status(200).send(courses); 
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});
router.post('/syncCourses', async (req, res) => {
    try {
        await Course.deleteMany({});

        const courses = req.body; 

        await Course.insertMany(courses);

        return res.status(200).send({ message: "Courses synced successfully" });
    } catch (error) {
        return res.status(500).send({ message: error.message }); 
    }
});


module.exports = router;
