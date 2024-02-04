const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", UserSchema);
