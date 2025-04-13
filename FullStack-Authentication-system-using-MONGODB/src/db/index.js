import mongoose from "mongoose";
import { DB_NAME } from "../utils/constant.js";

const connectDB = () => {
  mongoose
    .connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    .then(() => console.log("Database connection successful"))
    .catch((err) => {
      console.error("Database connection failed", err);
      process.exit(1);
    });
};

export default connectDB;
