const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Product");

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
    res.status(401).send(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {}
};

module.exports = { addProduct, getProduct };
