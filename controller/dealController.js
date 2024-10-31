// controllers/dealController.js

import Deal from "../models/Deal.js";
import Product from "../models/Products.js"; // Import the Product model

// Create a new deal with product and variation validation
export const createDeal = async (req, res) => {
  try {
    const {
      title,
      description,
      discountPercentage,
      productsIncluded, // Includes variation details
      startDate,
      endDate,
      startTime,
      endTime,
      daysOfWeek,
      img,
      price,
    } = req.body;

    // Validate products and variations
    for (let item of productsIncluded) {
      const { productId, selectedVariation } = item;

      // Check if product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product with ID ${productId} does not exist.` });
      }
    }

    // Create the deal if all products and variations are valid
    const newDeal = new Deal({
      title,
      description,
      discountPercentage,
      productsIncluded,
      startDate,
      endDate,
      img,
      price,
      startTime,
      endTime,
      daysOfWeek,
    });

    await newDeal.save();
    res.status(201).json({ message: "Deal created successfully", newDeal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit a deal with product and variation validation

export const editDeal = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    discountPercentage,
    productsIncluded, // Includes variation details
    startDate,
    endDate,
    startTime,
    endTime,
    img,
    daysOfWeek,
  } = req.body;
  console.log(img);
  
  try {
    // Find and validate deal
    const deal = await Deal.findById(id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    // Validate products and variations if provided
    if (productsIncluded) {
      for (let item of productsIncluded) {
        const { productId, variation } = item;

        const product = await Product.findById(productId);
        if (!product) {
          return res
            .status(400)
            .json({ message: `Product with ID ${productId} does not exist.` });
        }

        const variationExists = product.variations.some(
          (v) => v.size === variation.size && v.price === variation.price
        );

        if (!variationExists) {
          return res.status(400).json({
            message: `Variation with size ${variation.size} and price ${variation.price} does not exist for product ${productId}.`,
          });
        }
      }
    }

    // Update the deal
    deal.title = title || deal.title;
    deal.img = img || deal.img;
    deal.description = description || deal.description;
    deal.discountPercentage = discountPercentage || deal.discountPercentage;
    deal.productsIncluded = productsIncluded || deal.productsIncluded;
    deal.startDate = startDate || deal.startDate;
    deal.endDate = endDate || deal.endDate;
    deal.startTime = startTime || deal.startTime;
    deal.endTime = endTime || deal.endTime;
    deal.daysOfWeek = daysOfWeek || deal.daysOfWeek;

    const updatedDeal = await deal.save();
    res.status(200).json({ message: "Deal updated successfully", updatedDeal });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a deal by ID

export const deleteDeal = async (req, res) => {
  const { id } = req.params;

  try {
    const deal = await Deal.findById(id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    await Deal.findByIdAndDelete(id);
    res.status(200).json({ message: "Deal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get active deals with product details

export const getActiveDeals = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });
    const currentTime = currentDate
      .toTimeString()
      .split(" ")[0]
      .substring(0, 5); // Format HH:MM

    const activeDeals = await Deal.find({
      active: true,
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      daysOfWeek: { $in: [currentDay] },
      startTime: { $lte: currentTime },
      endTime: { $gte: currentTime },
    }).populate("productsIncluded.productId"); // Populate product details

    res.status(200).json(activeDeals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single deal by ID with product details
export const getSingleDeal = async (req, res) => {
  const { id } = req.params;

  try {
    const deal = await Deal.findById(id).populate("productsIncluded.productId"); // Populate product details

    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json(deal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
