import mongoose from "mongoose";

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
      trim: true,
      minlength: [3, "Title should be at least 3 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description should be at least 10 characters long"],
    },
    discountPercentage: {
      type: Number,
      required: [true, "Discount percentage is required"],
      min: [1, "Discount should be at least 1%"],
      max: [100, "Discount cannot exceed 100%"],
    },
    productsIncluded: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product ID is required"],
        },
        selectedVariation: {
          size: {
            type: String,
            required: [true, "Variation size is required"],
          },
          price: {
            type: Number,
            required: [true, "Variation price is required"],
          },
        },
      },
    ],
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    img: {
      type: String,
      required: [true, "Image is required"],
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "Start time must be in HH:MM format",
      ],
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
      match: [
        /^([01]\d|2[0-3]):([0-5]\d)$/,
        "End time must be in HH:MM format",
      ],
    },
    daysOfWeek: {
      type: [String],
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      required: [true, "Days of the week are required"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Deal = mongoose.model("Deal", dealSchema);
export default Deal;
