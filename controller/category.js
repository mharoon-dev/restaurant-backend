import express from "express";
import Category from "../models/Categories.js";
export const usersRoutes = express.Router();

// create
export const createCategory = async (req, res) => {
  const { name, img } = req.body;
  if (!name || !img) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    console.log(savedCategory);

    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update
export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete
export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("category has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// get
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all
export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};
