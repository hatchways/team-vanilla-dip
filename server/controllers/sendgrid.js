const asyncHandler = require("express-async-handler");
const sgMail = require('@sendgrid/mail')

const User = require("../models/User");
const Contest = require("../models/Contest");

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendWinnerEmail =  asyncHandler(async (req, res)=> {
    const userID = req.user.id;
    const contestID = req.params.id;
    let success = false;
    const { receiverID } = req.body;
    try {
        const user = await User.findById(userID);
        const receiver = await User.findById(receiverID);
        if (!user || !receiver){
            return res.status(500).json({
                status: "User not found"
            })
        }
        const contest = await Contest.findById(contestID);
        if (!contest){
            return res.status(500).json({
                status: "Contest not found"
            })
        }
        const msg = {
            to: receiver.email,
            from: {
                name:'TeamVanillaDip',
                email: 'holuwadanzy@gmail.com',
            },
            subject: "Contest Winner",
            text: `You have been selected a winner in the '${contest.title}'`,
        }
        await sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            success = true;
        })
        .catch((error) => {
            console.error(error)
        })
        if (success) {
            return res.status(200).json({
                status: 'Email Sent Successfully'
            })
        }
        return res.status(500).json({status: "An error Occured"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({status: "error",
        error
        })
    }
})
