const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        default: ''
    },
    status: {
        type: String
    },
})

module.exports = Profile = mongoose.model("Profile", profileSchema)