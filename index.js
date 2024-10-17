import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe"; // Stripe import
import { connectDB } from "./config/default.js";
import { authRoutes } from "./routes/auth.js";
import { userRoutes } from "./routes/user.js";
import { productRoutes } from "./routes/product.js";
import { categoryRoutes } from "./routes/category.js";
import { orderRoutes } from "./routes/order.js";
import User from "./models/Users.js";

dotenv.config();
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Load Stripe secret key

app.use(cors());
app.use(express.json());

connectDB();

// Payment intent creation route
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    return res
      .status(400)
      .json({ message: "Missing required parameters: amount or currency" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error); // Log the error
    res.status(500).json({ message: "Failed to create PaymentIntent", error });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({ message: "Failed to retrieve all users", error });
  }

  /******  313f06ac-8230-401a-b3ca-fb43d185dd0c  *******/
});

app.listen(process.env.PORT, () => {
  console.log(`Server is Running at http://localhost:${process.env.PORT}`);
});
