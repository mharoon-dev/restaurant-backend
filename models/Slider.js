import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    smallPara: {
      type: String,
      required: true,
    },
    heading1: {
      type: String,
      required: true,
    },
    heading2: {
      type: String,
      required: true,
    },
    card1: {
      type: String,
      required: true,
    },
    card2: {
      type: String,
      required: true,
    },
    card3: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;
