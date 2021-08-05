const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler")

// create transporter object with smtp server details
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


exports.sendWinnerEmail =  asyncHandler(async (req, res)=> {
    const contestID = req.params.id;
    const { receiverID } = req.body;
    const receiver = await User.findById(receiverID);
    
    if (!receiver){
        return res.status(404).json({
            status: "Receiver not found"
        })
    }
    const contest = await Contest.findById(contestID);
    if (!contest){
        return res.status(404).json({   
            status: "Contest not found"
        })
    }
    const message = {
        from: 'TeamVanilla <teamvanilladip@gmail.com>',
        to: receiver.email,
        subject: "Contest Winner",
        html: `<h1>You have been selected a winner in the '${contest.title}'</h1>`
    }
    transporter.sendMail(message, (err, info) => {
        if (err) {
            return res.status(500).json({status: "error",
                err
            })
        } else {
            return res.status(200).json({
                status: 'Email Sent Successfully',
                info
            })
        }
    })
});