const express = require("express");
const router = express.Router();

const { createMessage, getMessages } = require("../controllers/message");

router.route("/").post(createMessage);

router.route("/:convoID").get(getMessages);

module.exports = router;