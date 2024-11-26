const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        default: null,
    },
    courseId: {
        type: Number, 
        required: true,
    },
});

// Create model
const Class = mongoose.model("Class", classSchema);
module.exports = Class;
