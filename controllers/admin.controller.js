require("express-async-errors");
const { Product, validateProduct } = require("../models/product.model");
const { Order, validateOrder } = require("../models/order.model");
const { Auth, validateAuth } = require("../models/auth.model");
const {
  UserProfile,
  validateUserProfile,
} = require("../models/userProfile.model");

// User
exports.getUsersList = async (req, res) => {
  console.log("GET /api/admin/user/ - retrieve user list");

  const userProfiles = await UserProfile.find();
  if (!userProfiles)
    return res.status(404).json({ message: "User not found!" });

  res.status(200).json(userProfiles);
};

exports.getSingleUser = async (req, res) => {
  console.log("GET /api/admin/user/:userId - retrieve particular user");

  const userProfile = await UserProfile.findOne({ userId: req.params.userId });
  if (!userProfile) return res.status(404).send("User not found.");

  res.status(200).json(userProfile);
};

exports.deleteSpecificUser = async (req, res) => {
  console.log("DELETE /api/admin/user/:userId - delete particular user acount");

  const userProfile = await UserProfile.findOneAndDelete({
    userId: req.params.userId,
  });

  if (!userProfile) return res.status(404).send("User not found.");

  const auth = await Auth.findByIdAndDelete(req.params.userId);
  if (!auth) {
    return res.status(404).json({ message: "User auth information not found" });
  }

  res.status(200).json({ message: "User deleted successfully." });
};

// Order
exports.getOrderList = async (req, res) => {
  console.log("GET /api/admin/order - retrieve order list for particular user");

  const orders = await Order.find();
  if (orders.length === 0)
    return res.status(404).send("No orders found for this user.");

  res.status(200).json(orders);
};

exports.getSingleOrder = async (req, res) => {
  console.log("GET /api/admin/order/:orderId - retrieve a specific order");

  const order = await Order.findOne({
    orderId: req.params.orderId,
  });
  if (!order) return res.status(404).send("Order not found.");

  res.status(200).json(order);
};

exports.changeOrderStatus = async (req, res) => {
  console.log("PUT /api/admin/order/:orderId - update order status");

  const { error } = validateOrder(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const order = await Order.findOneAndUpdate(
    { orderId: req.params.orderId },
    req.body,
    { new: true }
  );
  if (!order) return res.status(404).send("Order not found.");

  res.status(200).json(order);
};

exports.deleteOrder = async (req, res) => {
  console.log("DELETE /api/admin/order/:orderId - cancel an order");

  const order = await Order.findOneAndDelete({
    orderId: req.params.orderId,
  });
  if (!order) return res.status(404).send("Order not found.");

  res.status(200).json({ message: "The order deleted!" });
};

// Product
exports.addSingleProduct = async (req, res) => {
  console.log("POST /api/admin/product/:productId - Add a product");
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let product = new Product(req.body);
  product = await product.save();
  res.status(201).json(product);
};

exports.updateProductInfo = async (req, res) => {
  console.log("PUT /api/admin/product/:productId - Update a product info");
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const product = await Product.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    {
      new: true,
    }
  );
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.status(200).json(product);
};

exports.deleteProduct = async (req, res) => {
  console.log("DELETE /api/admin/product/:productId - Delete single product");
  const product = await Product.findOneAndDelete({
    productId: req.params.productId,
  });
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.status(200).json({ message: "Product deleted successfully" });
};
