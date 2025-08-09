const Product = require("../../models/Product.model");

//Add a new product
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json({ message: "Product added", product: saved });
  } catch (err) {
    res.status(500).json({ message: "Add product failed", error: err.message });
  }
};

//Update product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updated = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product Updated", product: updated });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

//Delete product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await Product.findByIdAndDelete(productId);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

//View all products (admin)
const adminGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: err.message });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  adminGetAllProducts,
};
