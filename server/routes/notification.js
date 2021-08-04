const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createNotification , getNotifications, readNotification} = require("../controllers/notification");

router.route("/").post(protect, createNotification);
router.route("/").get(protect, getNotifications);

// UPDATE
router.route("/:id").patch(protect, readNotification);

module.exports = router;
