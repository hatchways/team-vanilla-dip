const Conversation = require("../models/Conversation");
const asyncHandler = require("express-async-handler");


// Given two unique userIDs, create a private conversation
exports.createConversation = asyncHandler(async (req, res) => {
    const senderID = req.user.id;
    const { receiverID } = req.body;

    const existingConvo = await Conversation.find({
        participants: { $all: [senderID, receiverID]}
    })

    if(existingConvo[0]) {
        return res.status(200).json(existingConvo[0]);
    }

    const newConvo = new Conversation({
        participants: [senderID, receiverID],
    });

    try {
        const savedConvo = await newConvo.save();
        res.status(201).json(savedConvo);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get all conversations of the authenticated user

exports.getConversations = asyncHandler(async (req, res) => {
    const userID  = req.user.id;

    try {
        const allConvos = await Conversation.find({
            participants: { $in: [userID]}, 
        })
        res.status(200).json({conversations: allConvos});
    } catch (error) {
        res.status(500).json(error);
    }
})

