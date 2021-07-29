const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");


//Based on ConversationID and SenderID, Create a message
exports.createMessage = asyncHandler(async (req, res) => {
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

//Based on ConversationID, get all the messages
exports.getMessages = asyncHandler(async (req, res) => {
    const { convoID } = req.params;
    try {
        const allMessages = await Message.find({
            conversationID: convoID,
        });
        res.status(200).json({messages: allMessages, lastMessage: allMessages[allMessages.length - 1]});
    } catch(error){
        res.status(500).json(error);
    }
})