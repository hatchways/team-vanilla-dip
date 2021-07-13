const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  prizeAmount: {
    type: Number,
    required: true,
  },
  deadlineDate: {
    type: Date,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
});

module.exports = User = mongoose.model("contest", contestSchema);
