const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, requied: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    promotion: { type: Number },
    status: { type: String },
  },
  { timestsamp: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
