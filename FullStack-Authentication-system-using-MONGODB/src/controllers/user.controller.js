import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import sendMail from "../utils/mailService.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
