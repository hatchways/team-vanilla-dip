const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.uploadProfile = asyncHandler(async (req, res, next) => {
    const userID = req.user.id;
    const { profileImage, status } = req.body;
    try {
        const user = await User.findById(userID);
        let profile = await Profile.findOneAndUpdate({userID: userID},{profileImage: profileImage, status: status}, {new: true})
        if (!profile) {            
            profile = new Profile({userID: userID});
            if (profileImage) {
                profile.update({profileImage: profileImage}, {new: true})
            }
            if (status) {
                profile.update({status: status}, {new: true})
            }
        }
        
        const result = await profile.save()
        if (!result) {
            return res.status(400).json({ status: "Profile not saved"})
        }
        res.status(201).json({
            success: {
              user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profile: profile
              }
            }
          });
    } catch(error) {
        return res.status(500).json({status: "error",
        error
        })
    }
})
