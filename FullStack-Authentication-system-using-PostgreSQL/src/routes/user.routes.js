import { registerUser } from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.get("/register", registerUser);

export default router;
