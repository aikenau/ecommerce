require("express-async-errors");
const bcrypt = require("bcrypt");
const { Product, validateProduct } = require("../models/product.model");

exports.getAllProduct = async (req, res) => {
  console.log("GET /api/product/ - Get all product");
  const products = await Product.find();
  if (!products) return res.status(400).json({ message: "No product!" });

  res.status(200).send(products);
};

exports.getSingleProduct = async (req, res) => {
  console.log("GET /api/product/:uuid - Get single product");
  const product = await Product.findOne({ uuid: req.params.uuid });
  if (!product) return res.status(400).json({ message: "No product!" });

  res.status(200).send(product);
};

exports.addSingleProduct = async (req, res) => {
  console.log("POST /api/product/:uuid - Add a product");
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let product = new Product(req.body);
  product = await product.save();
  res.status(201).json(product);
};

exports.addManyProducts = async (req, res) => {
  console.log("POST /api/products/ - Add multiple products");

  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: "Expected an array of products" });
  }

  const validationErrors = [];
  for (const product of req.body) {
    const { error } = validateProduct(product);
    if (error) {
      validationErrors.push(error.details[0].message);
    }
  }

  if (validationErrors.length > 0) {
    return res
      .status(400)
      .json({ message: "Validation errors", errors: validationErrors });
  }

  try {
    const newProducts = await Product.insertMany(req.body);
    res.status(201).json(newProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding products", error: error.message });
  }
};

exports.updateProductInfo = async (req, res) => {
  console.log("PUT /api/product/:uuid - Update a product info");
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const product = await Product.findOneAndUpdate(
    { uuid: req.params.uuid },
    req.body,
    {
      new: true,
    }
  );
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  console.log("DELETE /api/product/:uuid - Delete single product");
  const product = await Product.findOneAndDelete({ uuid: req.params.uuid });
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.status(200).json({ message: "Product deleted successfully" });
};
