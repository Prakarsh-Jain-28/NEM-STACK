const mongoose = require("mongoose");


//schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    job: {
        type: String,
    },
},{
    timestamps: true
});

//model
const Users = mongoose.model("User",userSchema);

module.exports = Users;