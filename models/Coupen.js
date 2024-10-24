import mongoose from "mongoose";

const coupenSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupen = mongoose.model("Coupen", coupenSchema);
export default Coupen;
