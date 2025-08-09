const Product = require("../../models/Product.model");

//Get all active and in-stock products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true, inStock: true }).sort(
      { createdAt: -1 }
    );
    res.json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to load products", error: err.message });
  }
};

//Get product by slug
const getProductBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug, isActive: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to load a product", error: err.message });
  }
};

//Search products by keyword
const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.query;
    const products = await Product.find({
      $text: { $search: keyword },
      isActive: true,
    });
    if (!products)
      return res.status(404).json({ message: "Product not found" });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};

module.exports = { getAllProducts, getProductBySlug, searchProducts };
