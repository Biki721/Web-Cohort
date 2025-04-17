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

  const emailHtml = `<p>Please click on the following link: </p>
          <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">
        Verify Email
      </a>
          `;

  await sendMail(user.email, "Verify your email", emailHtml);

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
    .status(201)
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
    throw new ApiError(403, "user is not verified");
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

export const getProfile = asyncHandler(async (req, res) => {
  console.log("reached Profile level");
  const user = await User.findById(req.user.id).select(
    "-password -verificationToken"
  );

  if (!user) {
    throw new ApiError(400, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile fetched successfully"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });
  console.log(user);

  const emailHtml = `<p>Please click on the following link: </p>
          <a href="${process.env.BASE_URL}/api/v1/users/reset-password/${token}">
        Reset Password
      </a>
          `;

  try {
    await sendMail(user.email, "Reset your password", emailHtml);

    return res.status(200).json(new ApiResponse(200, {}, "Reset email sent"));
  } catch (error) {
    // clean up in case of failure
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new ApiError(500, "Failed to send reset email");
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!token) {
    throw new ApiError(400, "Invalid token");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password and confirmPassword mismatch");
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password reset successful"));
});
