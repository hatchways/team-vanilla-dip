const express = require("express");
const router = express.Router();
const protect = require('../middleware/auth');
const {
    createContest,
    getContestById,
    getContests,
    updateContestById,
    getContestsByUserId
} = require("../controllers/contest");

const { createSubmission, getSubmission } = require('../controllers/submission')

// CREATE  
router.route("/create").post(createContest);
router.route("/:id/submission").post(createSubmission)

// READ
router.route("/:id").get(getContestById);
router.route("/").get(getContests);
router.route("/user/:userId").get(protect, getContestsByUserId);

// UPDATE
router.route("/:id").patch(updateContestById);

module.exports = router;
