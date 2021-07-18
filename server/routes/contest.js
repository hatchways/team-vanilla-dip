const express = require("express");
const router = express.Router();

const {
    createContest,
    getContestById,
    getContests,
    updateContestById,
    getContestsByUserId
} = require("../controllers/contest");

// CREATE
router.route("/create").post(createContest);

// READ
router.route("/:id").get(getContestById);
router.route("/").get(getContests);
router.route("/user/:userId").get(getContestsByUserId);

// UPDATE
router.route("/:id").patch(updateContestById);

module.exports = router;