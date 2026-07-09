const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    redirectURL: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    visitHistory: [{timestamp: {type: Number}}],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},
{timestamps: true}
);

const URL = mongoose.model("url",urlSchema);

module.exports = URL;