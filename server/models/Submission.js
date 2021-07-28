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
    imageFiles: {
        type: [{type: String}]
    },
    title: {
        type: String,
        required: true,
    }
}, {timestamps: true});

module.exports = ContestPage = mongoose.model("submission", submissionSchema)