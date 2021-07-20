const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { createMessage, getMessages } = require("../controllers/message");

router.route("/").post(protect, createMessage);

router.route("/:convoID").get(protect, getMessages);

module.exports = router;