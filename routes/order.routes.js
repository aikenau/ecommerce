const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const orderController = require("../controllers/order.controller");

router.post("/", auth, orderController.placeOrder);
router.get("/:orderId", auth, orderController.getSingleOrderForSpecificUser);
router.put("/:orderId", auth, orderController.changeOrderStatusForSpecificUser);
router.delete("/:orderId", auth, orderController.deleteOrderForSpecificUser);

module.exports = router;
