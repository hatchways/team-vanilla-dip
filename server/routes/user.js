const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers, searchUserById } = require("../controllers/user");

router.route("/").get(protect, searchUsers);
router.route("/:id").get(protect, searchUserById);

module.exports = router;
