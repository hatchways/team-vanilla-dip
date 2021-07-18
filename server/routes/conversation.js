const express = require("express");
const router = express.Router();

const { createConversation } = require("../controllers/conversation");

router.route("/").post(createConversation);

module.exports = router;