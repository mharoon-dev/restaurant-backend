import Order from "../models/Orders.js";
// import User from "../models/Users.js";
import Stripe from "stripe"; // Import Stripe
import Product from "../models/Products.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// create
export const createOrder = async (req, res) => {
  const {
    userDetails,
    products,
    amount,
    address,
    phoneNumber,
    paymentIntentId,
    cashOnDelivery,
  } = req.body;

  if (!userDetails || !products || !amount || !address || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    if (cashOnDelivery === false) {
      const paymentIntent = await stripe?.paymentIntents?.retrieve?.(
        paymentIntentId
      );

      if (paymentIntent?.status !== "succeeded") {
        return res.status(400).json({ message: "Payment not confirmed" });
      }
    }

    const newOrder = new Order({
      userDetails,
      products,
      amount,
      address,
      phoneNumber,
      cashOnDelivery,
    });
    const savedOrder = await newOrder.save();

    // update the sellsCount of product
    for (const product of products) {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: product._id },
        { $inc: { sellsCount: product.quantity } },
        { new: true }
      );
    }

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error); // Log the error
    res
      .status(500)
      .json({ message: "An error occurred during order creation", error });
  }
};

// update
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete
export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get user orders
export const getOrder = async (req, res) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ "userDetails._id": userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getOrderByQuery = async (req, res) => {
  const query = req.query;
  console.log(query);

  try {
    if (!query) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (query.userId) {
      // find the ordersthrough the userId in the userDetails
      const orders = await Order.find({
        "userDetails._id": query.userId,
      });

      return res.status(200).json(orders);
    }
    const orders = await Order.find(query);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all orders
export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get monthly income
export const getMonthlyIncome = async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
