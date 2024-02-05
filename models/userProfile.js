const mongoose = require("mongoose");
const Joi = require("joi");

const UserProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: {
    street: String,
    city: String,
    postal: String,
    country: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

function validateUserProfile(userProfile) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      postal: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
  });

  return schema.validate(userProfile);
}

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

module.exports.validateUserProfile = validateUserProfile;
module.exports.UserProfile = UserProfile;
