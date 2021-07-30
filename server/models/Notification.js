const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    notificationType: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    read: {
        type: Boolean,
        default: false,
        required: true
    }

}, {timestamps: true});

module.exports = Submission = mongoose.model("notification", notificationSchema)
