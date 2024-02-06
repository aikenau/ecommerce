const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Auth } = require("../models/auth.model");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateLoginInfo(req.body);
  if (error) return res.status(400).json(error.details);

  let info = await Auth.findOne({ username: req.body.username });
  if (!info) return res.status(400).json("Invalid username or password");

  const validPassword = await bcrypt.compare(req.body.password, info.password);
  if (!validPassword)
    return res.status(400).json("Invalid username or password");

  const token = info.generateAuthToken();

  //
  // --- when frontend is ok
  //
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "None",
  //   maxAge: 3600000,
  // });
  // res.status(200).send("Token stored in cookie");

  res.header("x-auth-token", token).send({ token });
});

function validateLoginInfo(req) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(8).max(128).required(),
  });

  return schema.validate(req);
}

module.exports = router;
