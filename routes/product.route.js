const express = require("express");

const ProductController = require("../controllers/Product.controller");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = express.Router();

router
  .route("/")
  .get(ProductController.getAllProducts)
  .post( ProductController.addProduct);

router
  .route("/:productId")
  .get(ProductController.getAProductById)
  .put(verifyTokenAndAdmin, ProductController.updateProductById);

module.exports = router;
