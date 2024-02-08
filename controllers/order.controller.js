require("express-async-errors");
const { Order, validateOrder } = require("../models/order.model");

exports.placeOrder = async (req, res) => {
  console.log("POST /api/order - place a new order");

  if (!req.user) return res.status(403).send("User not authenticated");
  req.body.userId = req.user._id;

  const { error } = validateOrder(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let order = new Order(req.body);
  order = await order.save();
  res.status(201).json(order);
};

exports.getOrderListForSpecificUser = async (req, res) => {
  console.log("GET /api/order - retrieve order list for particular user");
  if (!req.user) return res.status(403).send("User not authenticated");

  const orders = await Order.find({ userId: req.user._id });
  if (orders.length === 0)
    return res.status(404).send("No orders found for this user.");

  res.json(orders);
};

exports.getSingleOrderForSpecificUser = async (req, res) => {
  console.log("GET /api/order/:orderId - retrieve a specific order");
  const order = await Order.findOne({
    orderId: req.params.orderId,
    userId: req.user._id,
  });
  if (!order) return res.status(404).send("Order not found.");

  res.send(order);
};

exports.changeOrderStatusForSpecificUser = async (req, res) => {
  console.log("PUT /api/order/:orderId - update order status");

  const order = await Order.findOneAndUpdate(
    { orderId: req.params.orderId, userId: req.user._id },
    req.body,
    { new: true }
  );
  if (!order) return res.status(404).send("Order not found.");

  res.send(order);
};

exports.deleteOrderForSpecificUser = async (req, res) => {
  console.log("DELETE /api/order/:orderId cancel an order");
  const order = await Order.findOneAndDelete({
    orderId: req.params.orderId,
    userId: req.user._id,
  });
  if (!order) return res.status(404).send("Order not found.");

  res.status(204).json({ message: "The order deleted!" });
};
