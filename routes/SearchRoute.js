const express = require("express");
const { ProductsModel } = require("../models/ProductModel.js");
const searchProducts = require("../services/SearchService.js");

const searchRoutes = express.Router();


// GET /api/v1/search/product?query={} : these filters the products data on the bases of search
searchRoutes.get("/product", async (req, res) => {
  const { query } = req.query;
  try {

    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const products = await ProductsModel.find().lean();
    const results = searchProducts(products, query);

    res.json({ data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = searchRoutes;
