import { asyncHandler } from "../utils/asyncHandler.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sendMail from "../utils/mailService.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ name }, { email }],
    },
  });

  if (existingUser) {
    throw new ApiError(409, "name or email already exists");
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString("hex");

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      verificationToken: token,
    },
  });

  const emailHtml = `<p>Please click on the following link: </p>
          <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">
        Verify Email
      </a>
          `;

  await sendMail(user.email, "Verify your email", emailHtml);

  const { password: _, ...createdUser } = user;

  res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfuly "));
});

export const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    throw new ApiError(400, "Invalid token");
  }

  const user = await prisma.user.findFirst({
    where: { verificationToken: token },
  });

  if (!user) {
    throw new ApiError(400, "Invalid token");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationToken: null, // use null instead of undefined
    },
  });

  res
    .status(201)
    .json(new ApiResponse(200, "null", "User verified successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

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

  const loggedInUser = await prisma.user.findFirst({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      role: true,
      isVerified: true,
    },
  });

  const token = jwt.sign(
    { id: user.id, role: user.role },
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
    .json(new ApiResponse(200, loggedInUser, "User loggedIn successfuly"));
});

export const getProfile = asyncHandler(async (req, res) => {
  console.log("reached profile level");
  const user = prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      role: true,
      isVerified: true,
    },
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile fetched successfuly"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });

  res.status(200).json(new ApiResponse(200, {}, "User logged out successfuly"));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new ApiError(400, "Invalid email");
  }

  const token = crypto.randomBytes(32).toString("hex");
  await prisma.user.update({
    where: { email },
    data: {
      isVerified: false,
      resetPasswordToken: token,
      resetPasswordExpires: new Date(Date.now() + 10 * 60 * 1000),
    },
  });

  const emailHtml = `<p>Please click on the following link: </p>
          <a href="${process.env.BASE_URL}/api/v1/users/reset-password/${token}">
        Reset Password : ${process.env.BASE_URL}/api/v1/users/reset-password/${token}
      </a>`;

  try {
    await sendMail(user.email, "Reset your password", emailHtml);
    res.status(200).json(new ApiResponse(200, {}, "Reset email sent"));
  } catch (error) {
    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });
    throw new ApiError(500, "Failed to send reset email");
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!token) {
    throw new ApiError(400, "Invalid token");
  }

  if ([password, confirmPassword].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "password or confirmPassword is missing");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password and confirmPassword mismatch");
  }

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { gt: new Date() },
    },
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password reset successful"));
});
