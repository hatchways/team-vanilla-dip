const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { chargeCustomer, createCustomer, getSetupIntent } = require("../controllers/payment");


router.route("/charge/:contestID").post(protect, chargeCustomer);
router.route("/customer").post(protect, createCustomer);
router.route("/get-setup-intent").get(protect, getSetupIntent)

module.exports = router;