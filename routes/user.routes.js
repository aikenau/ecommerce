const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const userController = require("../controllers/user.controller");

router.get("/profile", auth, userController.getUserProfile);
router.post("/profile", auth, userController.updateOrCreateUserProfile);
router.delete("/profile", [auth, admin], userController.deleteUserProfile);
router.post("/register", userController.signUpNewUser);
router.get("/", (req, res) => {
  return res.status(403).json({ message: "Access denied" });
});

module.exports = router;
