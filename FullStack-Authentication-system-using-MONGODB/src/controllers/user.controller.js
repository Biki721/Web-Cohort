import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import sendMail from "../utils/mailService.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  /*
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
    */

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  //   const existingUser = await User.findOne({email})
  const existingUser = await User.findOne({ $or: [{ name }, { email }] });
  if (existingUser) {
    throw new ApiError(409, "name or email already exists");
  }

  const user = await User.create({ name, email, password });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Failed to register the user");
  }

  const token = crypto.randomBytes(32).toString("hex");
  console.log(token);
  user.verificationToken = token;

  await user.save();
  console.log(user);

  await sendMail(user.email, token);

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;
  if (!token) {
    throw new ApiError(400, "Invalid token");
  }
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw new ApiError(400, "Invalid token");
  }
  user.isVerified = true;

  user.verificationToken = undefined;

  await user.save();

  return res
    .statusCode(201)
    .json(new ApiResponse(200, null, "User Verified successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  if (!user.isVerified) {
    throw new ApiError(400, "user is not verified");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid email or password");
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -verificationToken -resetPasswordToken -resetPasswordExpires"
  );

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };

  res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(new ApiResponse(200, loggedInUser, "User loggedIn successfully"));
});
