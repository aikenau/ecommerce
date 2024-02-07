const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const productController = require("../controllers/product.controller");

router.get("/:productId", productController.getSingleProduct);
router.get("/", productController.getAllProduct);
router.post("/", [auth, admin], productController.addSingleProduct);
router.put("/:productId", [auth, admin], productController.updateProductInfo);
router.delete("/:productId", [auth, admin], productController.deleteProduct);

module.exports = router;
