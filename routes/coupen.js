import express from "express";
import {
  addCoupen,
  deleteCoupen,
  getCoupen,
  getCoupens,
  updateCoupen,
} from "../controller/coupen.js";

export const coupenRoutes = express.Router();

coupenRoutes.post("/", addCoupen);

coupenRoutes.get("/", getCoupens);

coupenRoutes.get("/singlecoupen", getCoupen);

coupenRoutes.put("/:id", updateCoupen);

coupenRoutes.delete("/:id", deleteCoupen);
