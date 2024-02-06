require("express-async-errors");
const bcrypt = require("bcrypt");
const { Auth, validateAuth } = require("../models/auth.model");
const {
  UserProfile,
  validateUserProfile,
} = require("../models/userProfile.model");

exports.getUserProfile = async (req, res) => {
  console.log("GET /api/user/:id - Get user profile");
  console.log(req.user);

  const user = await UserProfile.findOne({ userId: req.user._id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

exports.updateOrCreateUserProfile = async (req, res) => {
  console.log("POST /api/user/:id - Update user profile");
  const { error } = validateUserProfile(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: error.details });
  }

  const user = await UserProfile.findOneAndUpdate(
    { userId: req.user._id },
    req.body,
    { new: true, upsert: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User profile updated", user });
};

exports.deleteUserProfile = async (req, res) => {
  console.log("DELETE /api/user/:id - Delete a user");

  const user = await UserProfile.findOneAndDelete({ userId: req.user._id });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User profile deleted" });
};

exports.signUpNewUser = async (req, res) => {
  console.log("POST /api/user/ - SignUp a new user");
  const { error } = validateAuth(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: error.details });
  }

  const IsAlreadyExist = await Auth.findOne({ email: req.body.email });
  if (IsAlreadyExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new Auth({
    ...req.body,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: "New user added", userId: newUser._id });
};
