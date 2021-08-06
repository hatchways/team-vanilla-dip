const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema({
  contestTitle: {
    type: String,
    required: true
  },
  winningDate: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
}, {timestamps: true});

module.exports = User = mongoose.model("winner", winnerSchema);