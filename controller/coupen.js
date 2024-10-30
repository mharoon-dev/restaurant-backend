import Coupen from "../models/Coupen.js";

export const addCoupen = (req, res) => {
  try {
    const { code, discount, active, desc } = req.body;

    if (!code || !discount || !active || !desc) {
      res.status(400).send({ message: "Content can not be empty!" });
    }
    console.log(code, discount, active, desc);

    const newCoupen = new Coupen({
      code,
      discount,
      active,
      desc,
    });

    newCoupen.save();
    res.status(200).json(newCoupen);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getCoupens = async (req, res) => {
  try {
    const coupens = await Coupen.find();
    res.status(200).json(coupens);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get single coupen by querry
export const getCoupen = async (req, res) => {
  try {
    const query = req.query;

    const coupen = await Coupen.find(query);
    console.log(coupen);

    // Check if coupen array is empty
    if (!coupen || coupen.length === 0) {
      return res.status(404).json({ message: "Coupen not found" });
    }
    res.status(200).json(coupen.slice(0, 1));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCoupen = async (req, res) => {
  try {
    if (req.body.code) {
      // check the code is already exist or not
      const checkCode = await Coupen.findOne({
        code: req.body.code,
        _id: { $ne: req.params.id },
      });

      if (checkCode) {
        return res.status(400).json({ message: "Code already exist" });
      }
    }
    const coupen = await Coupen.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(coupen);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCoupen = async (req, res) => {
  try {
    await Coupen.findByIdAndDelete(req.params.id);
    res.status(200).json("Coupen has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};
