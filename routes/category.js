import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} from "../controller/category.js";
export const categoryRoutes = express.Router();

// add
// http://localhost:5000/api/categories/:id
// put
categoryRoutes.post("/", createCategory);

// update
// http://localhost:5000/api/categories/:id
// put
categoryRoutes.put("/:id", updateCategory);

// delete
// http://localhost:5000/api/categories/:id
// put
categoryRoutes.delete("/:id", deleteCategory);

// GET
// http://localhost:5000/api/categories/find/:id
// get
categoryRoutes.get("/find/:id", getCategory);

// GET ALL USER
// http://localhost:5000/api/categories
// get
categoryRoutes.get("/", getAllCategory);
