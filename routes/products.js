const router = require("express").Router();
const mongoose = require("mongoose");
const PostController = require("../controller/product.controller");
const Product = require("../models/Product");

// Add Product API
router.post("/add-product", PostController.addProduct);
// List Product API
router.get("/productList", PostController.getAllProducts);
// For getting product information Using Product Id
router.post("/info/:id", PostController.getProduct);
router.delete("/delete/:id", PostController.deleteProduct);

module.exports = router;
