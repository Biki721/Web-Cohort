import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL,
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["content-type", "authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Welcome to the project");
});

app.get("/biki", (req, res) => {
  res.send("Hello Biki");
});

connectDB();
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
