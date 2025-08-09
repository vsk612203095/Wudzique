let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  priceAtTime: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    default: 1,
  },
});

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
    total: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "abandoned", "converted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

CartSchema.index({ user: 1 }, { unique: true });

//Calculate total before saving
CartSchema.pre("save", function (next) {
  this.total = this.items.reduce(
    (sum, item) => sum + item.priceAtTime * item.quantity,
    0
  );
  next();
});

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;
