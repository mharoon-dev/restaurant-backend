import mongoose from "mongoose";
// import validator from 'validator';

const register = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please Add User Name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please Add Email"],
      unique: true,
      trim: true,
      lowercase: true,
      // validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, "Please Add Password"],
      minlength: 8,
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "Please Add Contact"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Please Add Address"],
      trim: true,
    },
    otp: {
      type: String,
    },
    expiresIn: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", register);
