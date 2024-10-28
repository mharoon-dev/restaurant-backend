import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    otp: {
      type: String,
      required: false, // Only required when OTP is generated
    },
    expiresIn: {
      type: Date,
      required: false, // Only relevant when OTP is generated
    },
    isVerified: {
      type: Boolean,
      default: false, // To track if the user is verified
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

const User = mongoose.model("User", userSchema);

export default User;
