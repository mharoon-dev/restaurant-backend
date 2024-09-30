import express from "express";
import { verifyTokenAndAdmin } from "../helpers/token.js";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getMonthlyIncome,
  getOrder,
  updateOrder,
} from "../controller/order.js";
export const orderRoutes = express.Router();

// create
// http://localhost:5000/api/orders
// post
orderRoutes.post("/", createOrder);

// update
// http://localhost:5000/api/orders/:id
// put
orderRoutes.put("/:id", verifyTokenAndAdmin, updateOrder);

// delete
// http://localhost:5000/api/orders/:id
// delete
orderRoutes.delete("/:id", verifyTokenAndAdmin, deleteOrder);

// get user orders
// http:localhost:5000/api/orders/find/:userId
// get
orderRoutes.get("/find/:userId", getOrder);

// get all orders
// http://localhost:5000/api/orders
// get
orderRoutes.get("/", verifyTokenAndAdmin, getAllOrder);

// get monthly income
// http://localhost:5000/api/orders/income
// get
orderRoutes.get("/income",  getMonthlyIncome);
