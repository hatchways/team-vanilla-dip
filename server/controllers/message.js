const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");


//Based on ConversationID and SenderID, Create a message
exports.createMessage = asyncHandler(async (req, res) => {
    const { senderID, convoID, message } = req.body;
    const newMessage = new Message({
        conversationID: convoID,
        senderID,
        message,
    });

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Based on ConversationID, get all the messages
exports.getMessages = asyncHandler(async (req, res) => {
    const { convoID } = req.params;
    console.log(convoID);
    try {
        const allMessages = await Message.find({
            conversationID: convoID,
        });
        console.log(allMessages);
        res.status(200).json(allMessages);
    } catch(error){
        res.status(500).json(error);
    }
})