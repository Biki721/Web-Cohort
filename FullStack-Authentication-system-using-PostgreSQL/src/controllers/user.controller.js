import { asyncHandler } from "../utils/asyncHandler.js";
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

export const registerUser = asyncHandler(async (req, res, next) => {
  const {name, email, password} = req.body

  if( [name,email, password].some((field)=> field.trim()==="")){
    throw new ApiError(400,"All fields are required");
  }

  

});
