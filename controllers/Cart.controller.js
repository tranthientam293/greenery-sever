const e = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      const newCart = await Cart.create({
        userId: req.user.id,
      });
      return res.json(newCart);
    }

    const products = cart.products;
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

const addToCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.products = [...req.body];

      // if (
      //   cart.products.find((item) => item.productId == req.body.productId) ==
      //   null
      // ) {
      //   cart.products = [...cart.products, req.body];
      // } else {
      //   cart.products = cart.products.map((item) => {
      //     if (item.productId == req.body.productId) {
      //       return { ...item, quantity: item.quantity + req.body.quantity };
      //     } else {
      //       return item;
      //     }
      //   });
      // }
      await cart.save();
      return res.status(200).json("Item is added");
    } else {
      const newCart = await Cart.create({
        userId: req.user.id,
        products: [...req.body],
      });
      return res.json(newCart);
    }
  } catch (error) {
    res.json(error);
  }
};

// const getProductsInCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.user.id });
//     res.json(cart.products);
//   } catch (err) {
//     res.json({ error: err });
//   }
// };

const getCartDetail = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    const condition = cart.products;
    const result = [];
    for (let el of condition) {
      const product = await Product.findById(el.productId).exec();
      if (product) {
        result.push({ ...product._doc, quantity: el.quantity });
      } else {
        result.push(el);
      }
    }
    res.json({ result });
  } catch (err) {
    res.json(err);
  }
};

const removeItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    cart.products = cart.products.map((item) => {
      if (item.productId == req.body.productId) {
        return { ...item, quantity: item.quantity - req.body.quantity };
      } else {
        return item;
      }
    });
    const newCart = await cart.save();
    res.status(200).json("item is remove");
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { addToCart, getCart, getCartDetail, removeItem };
