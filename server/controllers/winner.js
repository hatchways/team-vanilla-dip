const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");

exports.selectWinner = asyncHandler(async (req, res) => {

    //1. Get contest by ID and 

    const senderID = req.user.id;
    const { convoID, message } = req.body;
    const newMessage = new Message({
        conversationID: convoID,
        senderID,
        message,
        read: false,
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(201).json({message: savedMessage});
    } catch (error) {
        res.status(500).json(error);
    }
})

exports.getWinners = asyncHandler(async (req, res) => {
    const senderID = req.user.id;
    const { convoID, message } = req.body;
    const newMessage = new Message({
        conversationID: convoID,
        senderID,
        message,
        read: false,
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(201).json({message: savedMessage});
    } catch (error) {
        res.status(500).json(error);
    }
})