const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { Auth, validateLoginInfo } = require("../models/auth.model");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/", authController.verifyAuthentication);
router.post("/update-email", authController.updateEmail);
router.post("/password-request/", authController.requestPasswordReset);
router.post("/password-request/reset/:token", authController.resetPassword);

module.exports = router;
