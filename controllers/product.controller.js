require("express-async-errors");
const { Product } = require("../models/product.model");

exports.getAllProduct = async (req, res) => {
  console.log("GET /api/product/ - Get all product");
  const products = await Product.find();
  if (!products) return res.status(400).json({ message: "No product!" });

  res.status(200).send(products);
};

exports.getSingleProduct = async (req, res) => {
  console.log("GET /api/product/:productId - Get single product");
  const product = await Product.findOne({ productId: req.params.productId });
  if (!product) return res.status(400).json({ message: "No product!" });

  res.status(200).send(product);
};
