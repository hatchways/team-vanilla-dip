const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        default: 'https://team-vanilla-dip.s3.ca-central-1.amazonaws.com/7c0c914fd9b8665800d4f0e4cc8e01c7042aaea8.png'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    status: {
        type: String
    },
})

module.exports = Profile = mongoose.model("Profile", profileSchema)