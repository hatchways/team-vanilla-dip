const express = require("express");
const router = express.Router();
const protect = require('../middleware/auth');
const {
    createContest,
    getContestById,
    getContests,
    updateContestById,
    getContestsByUserId,
    getSubmissionByContestId
} = require("../controllers/contest");

const { createSubmission } = require('../controllers/submission')

// CREATE  
router.route("/create").post(protect, createContest);
router.route("/:id/submission").post(protect,createSubmission)

// READ
router.route("/:id").get(getContestById);
router.route("/").get(getContests);
router.route("/user/:id").get(protect, getContestsByUserId);
router.route("/submission/:id").get(protect, getSubmissionByContestId)

// UPDATE
router.route("/:id").patch(updateContestById);

module.exports = router;
