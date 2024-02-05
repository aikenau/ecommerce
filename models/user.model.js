const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, maxlength: 128 },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {
      street: String,
      city: String,
      postal: String,
      country: String,
    },
  },
  roles: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required(),
    profile: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        postal: Joi.string().required(),
        country: Joi.string().required(),
      }).required(),
    }).required(),
    roles: Joi.array().items(Joi.string().valid("user", "admin")).required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
  });

  return schema.validate(user);
}

const User = mongoose.model("User", UserSchema);

module.exports.validateUser = validateUser;
module.exports.User = User;
