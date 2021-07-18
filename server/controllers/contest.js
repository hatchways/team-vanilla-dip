const Contest = require("../models/Contest");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// Given parameters passed in, create a contest
exports.createContest = asyncHandler(async (req, res, next) => {
    const userID = req.user.id
    const { title, description, prizeAmount, deadlineDate } = req.body;
    const contest = new Contest({
        title,
        description,
        prizeAmount,
        deadlineDate,
        userID
    });
    try {
        const result = await contest.save();
        if (!result) {
            return res.status(400).json({ status: "contest not saved!!" });
        }
        res.status(200).json({
            status: "contest saved!!",
            contest,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
})

// Given an ID and new parameters, update the contest for any future edits
exports.updateContestById = asyncHandler(async (req, res, next) => {
    const contestID = req.params.id;
    const { title, description, prizeAmount, deadlineDate } = req.body;
    try {
        const updatedContest = await Contest.findByIdAndUpdate(contestID, {
            title,
            description,
            prizeAmount,
            deadlineDate,
            userID
        });
        if (!updatedContest) {
            return res
                .status(404)
                .json({ status: "contest doesn't exist in records!!" });
        }
        // updating contest
        res.status(200).json({
            status: "contest updated!!",
            contest: updatedContest,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
})

// Given an ID, return contest with that ID
exports.getContestById = asyncHandler(async (req, res, next) => {
  const contestID = req.params.id;
  try {
    const foundContest = await Contest.findById({ _id: contestID });
    if (!foundContest) {
    return res.status(404).json({ status: "contest not found!!" });
    }
    res.status(200).json({
    status: "contest found!!",
    contest: foundContest,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
})

// A list of contests that are available for submission
exports.getContests = asyncHandler(async (req, res, next) => {
  try {
    const contests = await Contest.find({});
    if (contests.length === 0) {
      return res.status(404).json({ status: "no contests in records!!" });
    }
    res.status(200).json({
        numberOfContests: contests.length,
      contests,
    });
    } catch (error) {
    return res.status(500).send({ error });
    }
})

// return A list of contests that belongs to the userId
exports.getContestsByUserId = asyncHandler(async (req, res, next) =>{
    const userId = await User.findOne({_id: req.params.userId}).select('-password')

    try {
        const foundContest = await Contest.find({userID:userId});
        console.log(foundContest);
        if (!foundContest) {
            return res.status(404).json({ status: "contest not found!!" });
        }
        res.status(200).json({
            status: "contest found!!",
            contest: foundContest,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
})