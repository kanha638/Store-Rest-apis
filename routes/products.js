const router = require("express").Router();
const mongoose = require("mongoose");
const PostController = require("../controller/product.controller");
const Product = require("../models/Product");

// Add Product API
router.post("/add-product", PostController.addProduct);
// List Product API
router.post("/productList", PostController.getProduct);

module.exports = router;
