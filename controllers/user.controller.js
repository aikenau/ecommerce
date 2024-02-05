const { User, validateUser } = require("../models/user.model");

exports.getUserProfile = async (req, res) => {
  console.log("get user profile");

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  console.log("update user profile");
  const { error } = validateUser(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: error.details });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User profile updated", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user profile", error: error.message });
  }
};

exports.deleteUserProfile = async (req, res) => {
  console.log("delete a user");
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User profile deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user profile", error: error.message });
  }
};

exports.addNewUser = async (req, res) => {
  console.log("add new user");
  const { error } = validateUser(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: error.details });
  }

  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "New user added", userId: newUser._id }); // Respond with success
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding new user", error: error.message });
  }
};
