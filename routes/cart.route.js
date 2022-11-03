const express = require("express");
const { verifyTokenAndAthorization } = require("./verifyToken");
const router = express.Router();

const CartController = require("../controllers/Cart.controller");
const ProductController = require("../controllers/Product.controller");

router
  .route("/:userId/add")
  .post(verifyTokenAndAthorization, CartController.addToCart);

router
  .route("/:userId/remove")
  .post(verifyTokenAndAthorization, CartController.removeItem);

// router
//   .route("/:userId/delete")
//   .post(verifyTokenAndAthorization, CartController.deleteItem);

router
  .route("/:userId")
  .get(verifyTokenAndAthorization, CartController.getCartDetail);
module.exports = router;
