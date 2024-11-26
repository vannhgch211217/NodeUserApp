const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const courseSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: false,
    },
    day: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
});

courseSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
