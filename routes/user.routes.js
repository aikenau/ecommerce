const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

router.get("/", auth, userController.getUserProfile);
router.post("/", auth, userController.updateOrCreateUserProfile);
router.delete("/", auth, userController.deleteAccount);
router.post("/register", userController.signUpNewUser);

router.post("/request-password-reset", userController.requestPasswordReset);
router.post("/reset-password/:token", userController.resetPassword);

module.exports = router;
