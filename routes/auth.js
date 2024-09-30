import express from "express";
import {
  forgotPasswordEmail,
  isUserLoggedIn,
  login,
  resetPasswordEmail,
  signUp,
  verifyEmail,
} from "../controller/auth.js";
import { validateToken } from "../helpers/token.js";

export const authRoutes = express.Router();

authRoutes.post("/signup", signUp);

authRoutes.post("/login", login);

authRoutes.post("/verifyEmail", validateToken, verifyEmail);

authRoutes.get("/isuserloggedin", validateToken, isUserLoggedIn);

// authRoutes.post("/forgotPassword", forgotPasswordEmail);

// authRoutes.put("/resetPassword", resetPasswordEmail);
