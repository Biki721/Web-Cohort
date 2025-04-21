import { asyncHandler } from "../utils/asyncHandler.js";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sendMail from "../utils/mailService.js";

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

