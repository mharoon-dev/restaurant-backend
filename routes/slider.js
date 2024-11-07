import express from "express";
import {
  createSlider,
  deleteSlider,
  getSingleSlider,
  getSliders,
  updateSlider,
} from "../controller/slider.js";
export const sliderRoutes = express.Router();

// add
// http://localhost:5000/api/sliders/
// put
sliderRoutes.post("/", createSlider);

// update
// http://localhost:5000/api/sliders/:id
// put
sliderRoutes.put("/:id", updateSlider);

// delete
// http://localhost:5000/api/sliders/:id
// put
sliderRoutes.delete("/:id", deleteSlider);

// GET
// http://localhost:5000/api/sliders/find/:id
// get
sliderRoutes.get("/find/:id", getSingleSlider);

// GET ALL USER
// http://localhost:5000/api/sliders
// get
sliderRoutes.get("/", getSliders);
