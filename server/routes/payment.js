const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { createCheckoutSession, createCustomer } = require("../controllers/payment");


router.route("/checkout-session/:contestID").get(protect, createCheckoutSession);
router.route("/customer").post(protect, createCustomer);

module.exports = router;