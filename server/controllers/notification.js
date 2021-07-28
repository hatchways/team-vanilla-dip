const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

exports.createNotification = asyncHandler(async (req, res, next) => {
    const sender = req.user.id;
    const {receiver, content, notificationType} = req.body;
    try {
        const notification = await new Notification({
            sender,
            content,
            notificationType,
            receiver
        }).save();
        if (!notification) {
            return res.status(400).json({ status: "submission not saved"})
        }
        return res.status(201).json({
            status: "notification sent",
            notification
        })
    }
    catch (error) {
        return res.status(500).json({status: "error",
            error
        })
    }

})
