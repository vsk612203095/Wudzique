const express = require("express");
const {
  getAllProducts,
  getProductBySlug,
  searchProducts,
} = require("../../controllers/web/productController");

const ProductRouter = express.Router();

ProductRouter.get("/all", getAllProducts);
ProductRouter.get("/:slug", getProductBySlug);
ProductRouter.get("/search/query", searchProducts); // GET - Search products by keyword

module.exports = ProductRouter;
