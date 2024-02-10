require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");

const AuthSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, maxlength: 128 },
  isAdmin: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

AuthSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
  return token;
};

AuthSchema.methods.generateAuthTokenWithExpires = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

function validateAuth(loginInfo) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(loginInfo);
}

function validateEmail(email) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(email);
}

function validateLoginInfo(req) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email().min(5).max(255),
    password: Joi.string().min(8).max(128).required(),
  });

  return schema.validate(req);
}

const Auth = mongoose.model("Auth", AuthSchema);

module.exports.validateAuth = validateAuth;
module.exports.validateEmail = validateEmail;
module.exports.validateLoginInfo = validateLoginInfo;
module.exports.Auth = Auth;
