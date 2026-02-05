const express = require("express");
const { ProductsModel } = require('../models/ProductModel.js');
const productRoute = express.Router();


// POST /api/v1/product : adding a new product to the products collection in the database
productRoute.post("/", async (req, res) => {
  try {
    const newProduct = new ProductsModel(req.body);
    await newProduct.save();
    res.status(201).json({ productId: newProduct._id })
  } 
  catch (error) {
    res.status(400).json({ error: error.message });
    console.log("not able to send post request to product", error);
  }
})

// PUT /api/v1/product/meta-data : this is to update the metadata
productRoute.put('/metadata', async (req, res) => {
  const { productId, metadata } = req.body
  try {
    const newProduct = await ProductsModel.findByIdAndUpdate(
      productId,
      { metadata: metadata },
      { new: true }
    )

    if (!newProduct) {
      res.status(400).json({ error: "product not found" })
    }

    res.status(201).json({ 
      productId: newProduct._id,
      metadata: newProduct.metadata
    })
  } 
  catch (error) {
    res.status(400).json({ error: error.message })
    console.log("not able to compelete the PUT request to metadata", error);  
  }
})

// POST /api/v1/product/bulk : this is to insert many products at the same time
// This is just so that i have number of data to test the search engien
productRoute.post("/bulk", async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        error: "Request body must be a non-empty array of products"
      });
    }

    const insertedProducts = await ProductsModel.insertMany(products, {
      ordered: true // stop on first error (safer)
    });

    res.status(201).json({
      message: "Products inserted successfully",
      count: insertedProducts.length,
      productIds: insertedProducts.map(p => p._id)
    });
  } catch (error) {
    console.error("Bulk insert failed:", error);
    res.status(400).json({
      error: error.message
    });
  }
});

module.exports = productRoute;