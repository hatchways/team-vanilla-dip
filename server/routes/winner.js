const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { selectWinner } = require("../controllers/winnner");

router.route("/").post(protect, selectWinner);


module.exports = router;
