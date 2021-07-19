const User = require("../models/User");
module.exports.protect = async (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(401).send("No userId received");
    }
    try {
        const user = await User.findOne({_id: userId}).select('-password')
        if(!user){
            return res.status(404).json({ status: `No userId ${userId} found in database` });
        }
        req.user = user;
        next()

    } catch (err) {
        res.status(401).send("userId is not valid");
    }
};
