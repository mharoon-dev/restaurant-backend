import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { rateLimit } from "express-rate-limit";
import { connectDB } from "./config/default.js";
import { authRoutes } from "./routes/auth.js";
import { userRoutes } from "./routes/user.js";
import { productRoutes } from "./routes/product.js";
import { categoryRoutes } from "./routes/category.js";
import { orderRoutes } from "./routes/order.js";
// import "./cronJob.js";

const app = express();

dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

connectDB();

// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 15 minutes
//   limit: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
//   // standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//   // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
//   // store: ... , // Use an external store for consistency across multiple server instances.
//   message: "Too many requests, please try again later.",
// });

// Apply the rate limiting middleware to all requests.
// app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is Running at http://localhost:${process.env.PORT}`);
});
