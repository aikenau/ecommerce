const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const Joi = require("joi");

const ProductSchema = new mongoose.Schema({
  productId: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  categories: [{ type: String, required: true }],
  images: [{ type: String, required: true }],
  stock: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProductSchema.index({ productId: 1 });

function validateProduct(product) {
  const schema = Joi.object({
    productId: Joi.string().guid({ version: "uuidv4" }).optional(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    categories: Joi.array().items(Joi.string().required()).min(1),
    images: Joi.array().items(Joi.string().required()).min(1),
    stock: Joi.number().min(0).required(),
  });

  return schema.validate(product);
}

const Product = mongoose.model("Product", ProductSchema);

module.exports.validateProduct = validateProduct;
module.exports.Product = Product;
