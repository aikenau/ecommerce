const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

router.get("/", auth, userController.getUserProfile);
router.post("/", auth, userController.updateOrCreateUserProfile);
router.delete("/", auth, userController.deleteAccount);
router.post("/register", userController.signUpNewUser);

module.exports = router;
