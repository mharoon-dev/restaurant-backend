import express from "express";
import Product from "../models/Products.js";
export const usersRoutes = express.Router();

// create
export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { title, img, desc, categories, variations, inStock } = req.body;

    if (!title || !img || !desc || !variations || !categories) {
      return res.status(400).send({ message: "Required fields are missing!" });
    }

    const newProduct = new Product({
      title,
      img,
      desc,
      categories,
      variations,
      sellsCount: 0,
    });

    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// get
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get mostsells
export const getMostSells = async (req, res) => {
  try {
    // get the category name from query
    const category = req.query.category;
    if (category) {
      const products = await Product.find({
        categories: {
          $in: [category],
        },
      })
        .sort({ sellsCount: -1 })
        .limit(3);
      res.status(200).json(products);
      return;
    } else {
      const products = await Product.find().sort({ sellsCount: -1 }).limit(3);
      res.status(200).json(products);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get all
export const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  console.log(qCategory);
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(100);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
