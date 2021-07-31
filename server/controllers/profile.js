const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

exports.uploadProfile = asyncHandler(async (req, res, next) => {
    const userID = req.user.id;
    const { profileImage, status } = req.body;
    console.log(`profileImage: ${profileImage}`)
    try {
        let profile = await Profile.findOneAndUpdate({userID: userID},{profileImage: profileImage, status: status}, {new: true})
        if (!profile) {            
            profile = new Profile({userID: userID});
            if (profileImage) {
                console.log("Setting Image");
                profile.update({profileImage: profileImage}, {new: true})
                console.log(profile);
            }
            if (status) {
                profile.update({status: status}, {new: true})
            }
        }
        
        const result = await profile.save()
        if (!result) {
            return res.status(400).json({ status: "Profile not saved"})
        }
        return res.status(201).json({
            status: "Profile saved",
            profile
        })
    } catch(error) {
        return res.status(500).json({status: "error",
        error
        })
    }
})
