import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
    sellsCount: {
      type: Number,
      default: 0,
    },
    variations: [variationSchema], // Add variations array
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
