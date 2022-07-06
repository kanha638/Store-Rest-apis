const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

// For adding product in the product document
const addProduct = async (req, res) => {
  try {
    const product = req.body;
    if (
      product.name &&
      product.description &&
      product.vendorId &&
      product.quantity &&
      product.price
    ) {
      let result = new Product(product);
      result = await result.save();
      res.status(200).json(result);
    } else {
      res
        .status(500)
        .json({ message: "all feild required for saving the post" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

// getting all the products in the database
const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(501).send(error);
  }
};

// For getting Information about some specific product
const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    let product = await Product.findOne({ _id: productId });
    if (!product) {
      res.status(401).json({ message: "post is not found" });
    } else {
      product = product.toObject();
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(502).json(error);
  }
};
// For deleting specific product

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.deleteOne({ _id: productId });
    res.status(200).json({ message: "deletion successful" });
  } catch (error) {
    res.status(502).json(error);
  }
};
module.exports = { addProduct, getAllProducts, getProduct, deleteProduct };
