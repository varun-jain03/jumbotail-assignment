const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  description: String,
  price: { type: Number, required: true },
  mrp: Number,
  currency: { type: String, default: "Rupee"},
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  unitSold: { type: Number, default: 0 },
  returnRate: { type: Number, default: 0 },
  brand: String,
  category: String,
  metadata: {
    ram: String,
    storage: String,
    color: String,
    screenSize: String,
    brightness: String,
    model: String
  },
  createdAt: { type: Date, default: Date.now }
});

const ProductsModel = mongoose.model( "Products", productSchema);

module.exports = { ProductsModel };