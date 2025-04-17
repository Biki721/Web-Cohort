import express from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", registerUser);
router.post("/login", loginUser);
// router.route("/login").post(loginUser);

export default router;
