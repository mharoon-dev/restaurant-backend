import Slider from "../models/Slider.js";

export const createSlider = async (req, res) => {
  const { smallPara, heading1, heading2, card1, card2, card3, img, link } =
    req.body;
  try {
    if (
      !smallPara ||
      !heading1 ||
      !heading2 ||
      !card1 ||
      !card2 ||
      !card3 ||
      !img ||
      !link
    ) {
      return res.status(400).send({ message: "Required fields are missing!" });
    }

    const newSlider = new Slider(req.body);
    const savedSlider = await newSlider.save();
    res.status(200).json(savedSlider);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSliders = async (req, res) => {
  try {
    const slider = await Slider.find();
    res.status(200).json(slider);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteSlider = async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.status(200).json("Slider has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateSlider = async (req, res) => {
  try {
    const updatedSlider = await Slider.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedSlider);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get single slider
export const getSingleSlider = async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    res.status(200).json(slider);
  } catch (err) {
    res.status(500).json(err);
  }
};
