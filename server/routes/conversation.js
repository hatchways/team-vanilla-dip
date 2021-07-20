const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { createConversation, getConversations } = require("../controllers/conversation");

router.route("/").post(protect, createConversation).get(protect, getConversations);

module.exports = router;