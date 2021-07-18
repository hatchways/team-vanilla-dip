const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    participants: {
        type: Array,
        ref: "user",
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("conversation", conversationSchema);