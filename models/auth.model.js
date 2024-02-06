require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Joi = require("joi");

const AuthSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, maxlength: 128 },
  isAdmin: { type: Boolean, default: false },
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

function validateAuth(loginInfo) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
    isAdmin: Joi.boolean().required(),
  });

  return schema.validate(loginInfo);
}

const Auth = mongoose.model("Auth", AuthSchema);

module.exports.validateAuth = validateAuth;
module.exports.Auth = Auth;
