let mongoose = require("mongoose");
const { default: slugify } = require("slugify");
let Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "clocks",
        "stands",
        "decoratives",
        "showpieces",
        "lamps",
        "utensils",
        "miniatures",
        "figurines",
        "other",
      ],
    },
    subcategory: {
      type: String,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    mainImage: {
      type: String,
      required: true,
    },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      unit: { type: String, default: "cm" },
    },
    weight: {
      type: Number,
    },
    material: {
      type: String,
      required: true,
    },
    finish: {
      type: String,
    },
    color: {
      type: String,
    },
    variants: [
      {
        color: String,
        image: String,
        stock: Number,
      },
    ],

    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
      },
    ],
    keywords: [
      {
        type: String,
      },
    ],
    shippingInfo: {
      deliveryTime: { type: String },
      returns: { type: Boolean, default: true },
    },
    ratings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        review: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ isFeatured: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ createdBy: 1 });
ProductSchema.index({ category: 1, isFeatured: 1 });
ProductSchema.index({
  name: "text",
  description: "text",
  tags: "text",
  keywords: "text",
});

ProductSchema.pre("save", function (next) {
  //Auto generate slug
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  //Auto -calculate price if original price and discount are present
  if (this.originalPrice && this.discountPercent) {
    const discount = (this.originalPrice * this.discountPercent) / 100;
    this.price = Math.round(this.originalPrice - discount);
  }

  //Calculate average rating
  if (this.ratings && this.ratings.length > 0) {
    const totalRating = this.ratings.reduce(
      (sum, rating) => sum + (rating.rating || 0),
      0
    );
    this.averageRating = totalRating / this.ratings.length;
    this.totalReviews = this.ratings.length;
  }
  next();
});

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
