const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/:id", userController.getUserProfile);
router.put("/:id", userController.updateUserProfile);
router.delete("/:id", userController.deleteUserProfile);
router.post("/", userController.signUpNewUser);
router.get("/", (req, res) => {
  return res.status(403).json({ message: "Access denied" });
});

module.exports = router;
