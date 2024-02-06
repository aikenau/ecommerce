const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const userController = require("../controllers/user.controller");

router.get("/:id", auth, userController.getUserProfile);
router.post("/:id", auth, userController.insertUserProfile);
router.put("/:id", userController.updateUserProfile);
router.delete("/:id", [auth, admin], userController.deleteUserProfile);
router.post("/", userController.signUpNewUser);
router.get("/", (req, res) => {
  return res.status(403).json({ message: "Access denied" });
});

module.exports = router;
