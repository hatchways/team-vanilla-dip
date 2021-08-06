const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const { selectWinner, getWinners } = require('../controllers/winner');

router.route('/').post(protect, selectWinner).get(protect, getWinners);

module.exports = router;
