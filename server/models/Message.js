const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    conversationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversation",
        required: true,
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    description: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("message", messageSchema);