const router = require("express").Router();
const cartController = require("../controller/cart.controller");

const mongoose = require("mongoose");

router.post("/add-to-cart", cartController.addtoCart);
router.post("/emptyCart", cartController.emptyCart);
router.get("/:userId", cartController.getCartitem);

module.exports = router;
