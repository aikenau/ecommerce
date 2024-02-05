const mongoose = require("mongoose");
const Joi = require("joi");

const AuthSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, maxlength: 128 },
  roles: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

function validateAuth(user) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
    roles: Joi.array().items(Joi.string().valid("user", "admin")).required(),
  });

  return schema.validate(user);
}

const Auth = mongoose.model("Auth", AuthSchema);

module.exports.validateAuth = validateAuth;
module.exports.Auth = Auth;
