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
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
    }
}, {timestamps: true});

module.exports = mongoose.model("message", messageSchema);