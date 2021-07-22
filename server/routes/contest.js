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

const { 
    createSubmission,
    getSubmission
 } = require("../controllers/submission");

// CREATE  
router.route("/create").post(protect, createContest);
router.route("/:id/submission").post(protect, createSubmission);



// READ
router.route("/:id").get(protect, getContestById);
router.route("/:id/submission").get(protect, getSubmission);
router.route("/").get(protect, getContests);
router.route("/user/:userId").get(protect, getContestsByUserId);

// UPDATE
router.route("/:id").patch(updateContestById);

module.exports = router;
