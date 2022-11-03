const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json({ products });
};

const getAProductById = async function (req, res) {
  const product = await Product.findById(req.params.productId);
  res.json({ product });
};

const addProduct = async function (req, res) {
  const product = await Product.create(req.body);
  res.json({ message: "product is created!" });
};

const updateProductById = async function (req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { $set: req.body },
      { new: true }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProductsByCondition = async function (req, res) {
  try {
    const condition = req.body;
    const result = [];
    for (let el of condition) {
      const product = await Product.findById(el);
      result.push({ ...product, quanitity: el.quanitity });
    }
    res.json({ result });
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getAProductById,
  updateProductById,
  getProductsByCondition,
};
