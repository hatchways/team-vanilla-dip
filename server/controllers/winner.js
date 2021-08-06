const Contest = require('../models/Contest');
const asyncHandler = require('express-async-handler');
const Winner = require('../models/Winner');

exports.selectWinner = asyncHandler(async (req, res) => {
  const { winner, contestID } = req.body;
  try {
    await Contest.findByIdAndUpdate(contestID, { closed: true });

    const newWinner = new Winner({
      contestTitle: winner.contestTitle,
      winningDate: winner.winningDate,
      image: winner.image,
      username: winner.username,
    });

    const savedWinner = await newWinner.save();
    res.status(201).json({ winner: savedWinner });
  } catch (error) {
    res.status(500).json(error);
  }
});

exports.getWinners = asyncHandler(async (req, res) => {
  try {
    const winners = await Winner.find({});
    res.status(200).json({ winners });
  } catch (error) {
    res.status(500).json(error);
  }
});
