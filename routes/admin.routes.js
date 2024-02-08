const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const adminController = require("../controllers/admin.controller");

// User
router.get("/user", [auth, admin], adminController.getUsersList);
router.get("/user/:userId", [auth, admin], adminController.getSingleUser);
router.delete(
  "/user/:userId",
  [auth, admin],
  adminController.deleteSpecificUser
);

// Order
router.get("/order", [auth, admin], adminController.getOrderList);
router.get("/order/:orderId", [auth, admin], adminController.getSingleOrder);
router.put("/order/:orderId", [auth, admin], adminController.changeOrderStatus);
router.delete("/order/:orderId", [auth, admin], adminController.deleteOrder);

// Product
router.post("/product/", [auth, admin], adminController.addSingleProduct);
router.put(
  "/product/:productId",
  [auth, admin],
  adminController.updateProductInfo
);
router.delete(
  "/product/:productId",
  [auth, admin],
  adminController.deleteProduct
);

module.exports = router;
