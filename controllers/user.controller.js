const User = require("../models/user.model");

exports.getUserProfile = (req, res) => {
  console.log("get user profile");
  res.json({ message: "get user profile" });
};

exports.updateUserProfile = (req, res) => {
  console.log("update user profile");
  res.json({ message: "update user profile", return: req.params.id });
};

exports.deleteUserProfile = (req, res) => {
  console.log("delete a user");
  res.json({ message: "delete a user" });
};

exports.addNewUser = async (req, res) => {
  console.log("add new user");
  const userData = req.body;
  try {
    const newUser = new User(userData);
    await newUser.save();
    res.status(201).json({ message: "New user added", userId: newUser._id }); // Respond with success
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding new user", error: error.message });
  }
};
