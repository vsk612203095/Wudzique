let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const WishlistItemSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [WishlistItemSchema],
  },
  {
    timestamps: true,
  }
);

WishlistSchema.index({ user: 1 }, { unique: true });
WishlistSchema.index({ "items.product": 1 });

const WishlistModel = mongoose.model("Wishlist", WishlistSchema);
module.exports = WishlistModel;
