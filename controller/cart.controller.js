const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart");

// For adding Items into the cart
const addtoCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const product = req.body.cartItem;
    const productId = product.productId;
    // Check whether the user have a Cart or not
    const cart = await Cart.findOne({ userId: userId });
    console.log(cart);
    if (cart) {
      // If User have a Cart already assigned
      const item = cart.cartItems.find((c) => c.productId == productId);
      // Getting Item which is in cartItems array and have the same productId
      if (item) {
        //If the product is present already
        const result = await Cart.findOneAndUpdate(
          { userId: userId, "cartItems.productId": productId },
          {
            $set: {
              "cartItems.$": [
                {
                  ...product,
                  quantity: item.quantity + product.quantity,
                  price: item.price + product.price,
                },
              ],
            },
          }
        );
        res.status(200).json(result);
      } else {
        //If product is not present in the cartItem array
        const result = await Cart.findOneAndUpdate(
          { userId: userId },
          {
            $push: {
              cartItems: product,
            },
          }
        );

        res.status(200).json(result);
      }
    } else {
      // If User does not have a Cart then
      let result = new Cart({
        userId: userId,
        cartItems: [product],
      });
      result = await result.save();

      res.status(200).json(result);
    }
  } catch (error) {
    res.status(501).json({ message: error });
  }
};

const emptyCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    await Cart.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          cartItems: [],
        },
      }
    );
    res.status(200).json({ message: "Cart empty success" });
  } catch (error) {
    res.status(501).json({ message: error });
  }
};

const getCartitem = async (req, res) => {
  try {
    const id = req.params.userId;
    const result = await Cart.find({ userId: id });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: "User Cart Not Found" });
    }
  } catch (error) {
    res.status(501).json({ message: error });
  }
};

const removeProduct = async (req, res) => {
  try {
    const userId = req.body.userId;
    const product = req.body.cartItem;
    const productId = product.productId;
    const quantity = product.quantity;

    const userCart = await Cart.findOne({ userId: userId });
    console.log(userCart);
    if (userCart) {
      const item = userCart.cartItems.find((c) => c.productId == productId);

      if (item) {
        if (item.quantity <= quantity) {
          const result = await Cart.findOneAndUpdate(
            { userId: userId, "cartItems.productId": productId },
            {
              $set: {
                "cartItems.$": [{}],
              },
            }
          );
          res.status(200).json({ message: "removel success" });
        } else {
          const result = await Cart.findOneAndUpdate(
            { userId: userId, "cartItems.productId": productId },
            {
              $set: {
                "cartItems.$": [
                  {
                    ...product,
                    quantity: item.quantity - quantity,
                    price: item.price - product.price * quantity,
                  },
                ],
              },
            }
          );
          res.status(200).json({ message: "removel success" });
        }
      } else {
        res.status(401).json({ message: "Product is already not present" });
      }
    } else {
      res.status(401).json({ message: "User Cart Not Found" });
    }
  } catch (error) {
    res.status(501).json({ error });
  }
};

module.exports = { addtoCart, emptyCart, getCartitem, removeProduct };
