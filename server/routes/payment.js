const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { createCheckoutSession } = require("../controllers/payment");


router.route("/checkout-session/:contestID").get(protect, createCheckoutSession);

module.exports = router;