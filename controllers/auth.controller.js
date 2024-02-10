require("express-async-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  Auth,
  validateEmail,
  validateLoginInfo,
} = require("../models/auth.model");

exports.updateEmail = async (req, res) => {
  console.log("POST /api/user/update-email - Update user's email");
  const { error } = validateEmail(req.body.email);

  if (error) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: error.details });
  }

  const emailExists = await Auth.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ message: "Email already exists!" });

  const updatedAuth = await Auth.findOneAndUpdate(
    { _id: req.user._id },
    { email: req.body.email },
    { new: true }
  );

  if (!updatedAuth) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "Email updated successfully", auth: updatedAuth });
};

exports.requestPasswordReset = async (req, res) => {
  console.log(
    "POST /api/user/passowrd-request - operation of password recovery"
  );

  const auth = await Auth.findOne({ email: req.body.email });
  if (!auth) return res.status(404).json({ message: "user not found!" });

  const token = Auth.generateAuthTokenWithExpires();

  console.log(`Password reset token (send via email): ${token}`);
  res.send("Password reset link has been sent to your email.");
};

exports.resetPassword = async (req, res) => {
  console.log("/password-request/reset/:token");
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Auth.findById(decoded._id);

    if (!user) return res.status(404).send("User not found.");

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();
    res.send("Password has been updated.");
  } catch (error) {
    res.status(400).send("Invalid or expired token.");
  }
};

exports.verifyAuthentication = async (req, res) => {
  const { error } = validateLoginInfo(req.body);
  if (error) return res.status(400).json(error.details);

  let info = await Auth.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  });
  if (!info) return res.status(400).json("Invalid username or password");

  const validPassword = await bcrypt.compare(req.body.password, info.password);
  if (!validPassword)
    return res.status(400).json("Invalid username or password");

  const token = info.generateAuthToken();

  //
  // Uncomment and use according to frontend setup
  //
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  //   maxAge: 3600000,
  // });
  // res.status(200).send("Token stored in cookie");

  res.header("x-auth-token", token).send({ token });
};
