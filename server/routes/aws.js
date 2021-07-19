import {upload} from "../models/AWS";
import {uploadImage} from "../controllers/aws";
const express = require('express');
const router = express.Router();

router.route("/upload",).post(upload.single('image',),uploadImage);
module.exports = router;
