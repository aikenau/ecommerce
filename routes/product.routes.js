const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const productController = require("../controllers/product.controller");

router.get("/:uuid", productController.getSingleProduct);
router.get("/", productController.getAllProduct);
router.post("/", [auth, admin], productController.addSingleProduct);
router.put("/:uuid", [auth, admin], productController.updateProductInfo);
router.delete("/:uuid", [auth, admin], productController.deleteProduct);

module.exports = router;
