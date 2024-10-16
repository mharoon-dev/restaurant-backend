import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userDetails: {
      type: Object,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    cashOnDelivery: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
