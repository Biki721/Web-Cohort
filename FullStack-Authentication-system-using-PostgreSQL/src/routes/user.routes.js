import { registerUser, verifyUser } from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyUser);

export default router;
