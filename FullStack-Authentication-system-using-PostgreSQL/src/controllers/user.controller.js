import { asyncHandler } from "../utils/asyncHandler.js";
import {PrismaClient} from "@prisma/client"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const prisma = new PrismaClient()

export const registerUser = asyncHandler(async (req, res, next) => {
  const {name, email, password} = req.body

  if( [name,email, password].some((field)=> field.trim()==="")){
    throw new ApiError(400,"All fields are required");
  }

  const existingUser = prisma.user.findFirst({
    where: {
      OR:[{name},{email}]
    }
  })

  if (existingUser){
    throw new ApiError(409, "name or email already exists");
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(password,10)
  const token = crypto.randomBytes(32).toString("hex")

  const user = await prisma.user.create({
    name,email, password:hashedPassword,verificationToken:token
  })

  const emailHtml = `<p>Please click on the following link: </p>
          <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}">
        Verify Email
      </a>
          `;

  await sendMail(user.email, "Verify your email", emailHtml);

  const {password:_, ...createdUser} = user

  res.status(201).json(new ApiResponse(200, createdUser, "user registered successfuly "))

});
