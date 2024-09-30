import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  getUserStats,
  updateUser,
} from "../controller/users.js";
export const userRoutes = express.Router();

// UPDATE
// http://localhost:5000/api/users/:id
// put
userRoutes.put("/:id", updateUser);

// delete
// http://localhost:5000/api/users/:id
// put
userRoutes.delete("/:id", deleteUser);

// GET USER
// http://localhost:5000/api/users/find/:id
// get
userRoutes.get("/find/:id", getUser);

// GET ALL USER
// http://localhost:5000/api/users
// get
userRoutes.get("/", getAllUser);

// GET USER STATS
// http://localhost:5000/api/users/stats
// get
userRoutes.get("/stats", getUserStats);
