const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" }
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users: users });
});


//search user by ID
exports.searchUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let user;
  if (id) {
    user = await User.findById(id);
  }

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  res.status(200).json(user);
});