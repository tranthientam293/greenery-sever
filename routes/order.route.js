const express = require("express");
const { verifyTokenAndAthorization } = require("./verifyToken");
const router = express.Router();

const OrderController = require("../controllers/Order.controller");

router
  .route("/:userId")
  .get(verifyTokenAndAthorization, OrderController.getOrders)
  .post(verifyTokenAndAthorization, OrderController.createOrder);

module.exports = router;
