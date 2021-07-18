const Conversation = require("../models/Conversation");
const asyncHandler = require("express-async-handler");


// Given two userIDs, create a conversation
exports.createConversation = asyncHandler(async (req, res) => {
    const { senderID, receiverID } = req.body;
    const newConvo = new Conversation({
        participants: [senderID, receiverID],
    });

    try {
        const savedConvo = await newConvo.save();
        res.status(200).json(savedConvo);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Based on userID in the params, get all conversations of the user

exports.getConversations = asyncHandler(async (req, res) => {
    const { userID } = req.params;
    try {
        const allConvos = await Conversation.find({
            participants: { $in: [userID]}, 
        })
        res.status(200).json(allConvos);
    } catch (error) {
        res.status(500).json(error);
    }
})

