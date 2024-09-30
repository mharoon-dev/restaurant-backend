import express from "express";
export const productRoutes = express.Router();
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controller/product.js";
import { verifyTokenAndAdmin } from "../helpers/token.js";

// create
// http://localhost:5000/api/products
// post
productRoutes.post("/", createProduct);

// update
// http://localhost:5000/api/products/:id
// put
productRoutes.put("/:id", verifyTokenAndAdmin, updateProduct);

// delete
// http://localhost:5000/api/products/:id
// delete
productRoutes.delete("/:id", verifyTokenAndAdmin, deleteProduct);

// get
// http://localhost:5000/api/products/find/:id
// get
productRoutes.get("/find/:id", getProduct);

// get all
// http://localhost:5000/api/products
// get
productRoutes.get("/", getAllProducts);
