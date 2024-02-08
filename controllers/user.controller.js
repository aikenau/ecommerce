require("express-async-errors");
const bcrypt = require("bcrypt");
const { Auth, validateAuth } = require("../models/auth.model");
const {
  UserProfile,
  validateUserProfile,
} = require("../models/userProfile.model");

exports.getUserProfile = async (req, res) => {
  console.log("GET /api/user/ - Get user profile");

  const user = await UserProfile.findOne({ userId: req.user._id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

exports.updateOrCreateUserProfile = async (req, res) => {
  console.log("POST /api/user/ - Update user profile");
  const { error } = validateUserProfile(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: error.details });
  }
  console.log(req.user._id);
  const user = await UserProfile.findOneAndUpdate(
    { userId: req.user._id },
    req.body,
    { new: true, upsert: true }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found 2" });
  }

  res.json({ message: "User profile updated", user });
};

exports.deleteAccount = async (req, res) => {
  console.log("DELETE /api/user/ - Delete a user");

  const userProfile = await UserProfile.findOneAndDelete({
    userId: req.user._id,
  });
  if (!userProfile) {
    return res.status(404).json({ message: "User profile not found" });
  }

  const auth = await Auth.findByIdAndDelete(req.user._id);
  if (!auth) {
    return res.status(404).json({ message: "User auth information not found" });
  }

  res.json({ message: "User profile and auth information deleted" });
};

exports.signUpNewUser = async (req, res) => {
  console.log("POST /api/user/register - SignUp a new user");
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

// Auth
exports.updateEmail = async (req, res) => {};

exports.requestPasswordReset = async (req, res) => {};

exports.resetPassword = async (req, res) => {};
