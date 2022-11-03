const Order = require("../models/Order");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
const createOrder = async (req, res) => {
  try {
    const respone = await Order.create({
      userId: req.user.id,
      products: req.body.products,
      address: req.body.address,
      totalPayment: req.body.totalPayment,
    });

    res.status(201).json(respone);
  } catch (err) {
    res.json(err);
  }
};

module.exports = { getOrders, createOrder };
