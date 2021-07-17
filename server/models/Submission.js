const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    contestID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contest",
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    imageFiles: {
        type: Array
    }
});

module.exports = Submission = mongoose.model("submission", submissionSchema)