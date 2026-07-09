const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Password must be at least 4 characters long"],
            maxlength: [15, "Password cannot exceed 15 characters"],
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User",userSchema);

module.exports = User;