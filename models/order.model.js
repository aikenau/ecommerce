const { nanoid } = require("nanoid");
const mongoose = require("mongoose");
const Joi = require("joi");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", required: true },
  orderId: { type: String, default: () => nanoid() },
  items: [
    {
      productId: {
        type: String,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ],
  total: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled", "refunded"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

OrderSchema.index({ orderId: 1, userId: 1 });

function validateOrder(order) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    orderId: Joi.string().required(),
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required(),
          quantity: Joi.number().min(1).required(),
          price: Joi.number().min(0).required(),
        })
      )
      .required(),
    total: Joi.number().min(0).required(),
    status: Joi.string()
      .valid("pending", "shipped", "delivered", "cancelled", "refunded")
      .optional(),
  });
  return Schema.validate(order);
}

const Order = mongoose.model("Order", OrderSchema);

module.exports.validateOrder = validateOrder;
module.exports.Order = Order;
