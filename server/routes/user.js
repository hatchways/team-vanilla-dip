const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers } = require("../controllers/user");
const { uploadProfile } = require('../controllers/profile')

router.route("/").get(protect, searchUsers);
router.route('/profile').post(protect, uploadProfile);

module.exports = router;
