const  {uploadImage} = require("../controllers/aws")
const express = require('express');
const protect = require('../middleware/auth');
const router = express.Router();

router.route("/upload",).post(protect,uploadImage);
module.exports = router;
