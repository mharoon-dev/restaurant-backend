// routes/dealRoutes.js

import express from "express";
import {
  createDeal,
  editDeal,
  deleteDeal,
  getActiveDeals,
  getSingleDeal,
} from "../controller/dealController.js";

export const dealRouter = express.Router();

dealRouter.post("/create", createDeal);
dealRouter.put("/edit/:id", editDeal);
dealRouter.delete("/delete/:id", deleteDeal);
dealRouter.get("/active-deals", getActiveDeals);
dealRouter.get("/:id", getSingleDeal);