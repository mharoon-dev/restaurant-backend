import express from "express";
import { verifyTokenAndAdmin } from "../helpers/token.js";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getMonthlyIncome,
  getOrder,
  getOrderByQuery,
  updateOrder,
} from "../controller/order.js";
export const orderRoutes = express.Router();

// create
// http://localhost:9000/api/orders
// post
orderRoutes.post("/", createOrder);

// update
// http://localhost:9000/api/orders/:id
// put
orderRoutes.put("/:id",  updateOrder);

// delete
// http://localhost:9000/api/orders/:id
// delete
orderRoutes.delete("/:id",  deleteOrder);

// get user orders
// http:localhost:9000/api/orders/find/:userId
// get
orderRoutes.get("/find/:userId", getOrder);

// get user by query
// http://localhost:9000/api/orders/find/?userId=61a0c6c8f6b5f0f9b9b9b9b9
// get
orderRoutes.get("/find", getOrderByQuery);

// get all orders
// http://localhost:9000/api/orders
// get
orderRoutes.get("/", getAllOrder);

// get monthly income
// http://localhost:9000/api/orders/income
// get
orderRoutes.get("/income",  getMonthlyIncome);
