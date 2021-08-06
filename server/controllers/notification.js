const Notification = require("../models/Notification");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');

exports.createNotification = asyncHandler(async (req, res, next) => {
    const sender = req.user.id;
    const {receiverID, content, notificationType} = req.body;
    const receiver = await User.findById(receiverID);
    if (!receiver) {
        return res.status(400).json({ status: "An error Occured! Receiver does not exist"})
    };
    try {
        const notification = await new Notification({
            sender,
            content,
            notificationType,
            receiver: receiver._id,
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
exports.getNotifications = asyncHandler(async (req, res, next) => {
    const userID = mongoose.Types.ObjectId(req.user.id)
    try {
        const foundNotification = await Notification.aggregate([
            { $match: { receiver: userID, read: false } },
            { $addFields: {id:"$_id" } },
        ]);
        if (!foundNotification) {
            return res.status(404).json({ status: "Notification not found!!" });
        }
        res.status(200).json({
            status: "Notification found!!",
            notifications: foundNotification,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
})
exports.readNotification = asyncHandler(async (req, res, next) => {
    const notificationID = req.params.id;
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(notificationID, {
            read: true
        });
        if (!updatedNotification) {
            return res
                .status(404)
                .json({ status: "notification doesn't exist in records!!" });
        }
        // updating contest
        res.status(200).json({
            status: "notification updated!!",
            notification: updatedNotification,
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
})