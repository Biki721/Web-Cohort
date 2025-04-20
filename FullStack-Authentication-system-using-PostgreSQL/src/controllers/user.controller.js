import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  res.send("Registration successful");
});
