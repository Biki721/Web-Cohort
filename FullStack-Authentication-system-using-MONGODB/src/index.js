import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";

//import all routes
import userRoutes from "./routes/user.routes.js";

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
  res.send("Welcome to the Authentication project");
});

app.get("/biki", (req, res) => {
  res.send("Hello Biki");
});

connectDB();

//user routes
app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
