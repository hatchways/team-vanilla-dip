const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { createCheckoutSession, createCustomer, getSetupIntent } = require("../controllers/payment");


router.route("/checkout-session/:contestID").get(protect, createCheckoutSession);
router.route("/customer").post(protect, createCustomer);
router.route("/get-setup-intent").get(protect, getSetupIntent)

module.exports = router;