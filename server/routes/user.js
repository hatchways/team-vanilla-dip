const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers, searchUserById } = require("../controllers/user");
const { uploadProfile, getProfile } = require('../controllers/profile')

router.route("/").get(protect, searchUsers);
router.route("/:id").get(protect, searchUserById);


router.route('/profile').post(protect, uploadProfile);
router.route('/profile/:userID').get(protect, getProfile);


module.exports = router;
