const { User, validateUser } = require("../models/user.model");
require("express-async-errors");

exports.getUserProfile = async (req, res) => {
  console.log("GET /api/user/:id - Get user profile");

  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

exports.updateUserProfile = async (req, res) => {
  console.log("PUT /api/user/:id - Update user profile");
  const { error } = validateUser(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: error.details });
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User profile updated", user });
};

exports.deleteUserProfile = async (req, res) => {
  console.log("DELETE /api/user/:id - Delete a user");

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User profile deleted" });
};

exports.addNewUser = async (req, res) => {
  console.log("POST /api/user/ - Add a new user");
  const { error } = validateUser(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: error.details });
  }

  const newUser = new User(req.body);
  await newUser.save();
  res.status(201).json({ message: "New user added", userId: newUser._id }); // Respond with success
};
