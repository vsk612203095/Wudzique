const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  adminGetAllProducts,
} = require("../../controllers/admin/productController");

const ProductRouter = express.Router();

ProductRouter.post("/add", addProduct);
ProductRouter.put("/update", updateProduct);
ProductRouter.delete("/delete", deleteProduct);
ProductRouter.get("/all", adminGetAllProducts);

module.exports = ProductRouter;
