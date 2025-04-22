import {
  registerUser,
  verifyUser,
  loginUser,
  getProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);
router.post("/login", loginUser);

router.get("/profile", isLoggedIn, getProfile);
router.get("/logout", isLoggedIn, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
