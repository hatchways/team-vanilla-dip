const express = require("express");
const router = express.Router();

const { createConversation, getConversations } = require("../controllers/conversation");

router.route("/").post(createConversation);

router.route("/:userID").get(getConversations);

module.exports = router;