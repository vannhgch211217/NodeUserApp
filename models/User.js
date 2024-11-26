const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    classIds: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
