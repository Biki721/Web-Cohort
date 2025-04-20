import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

//routes
import router from "./routes/user.routes.js";

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
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to Authentication system project using PostgreSql");
});

app.use("/api/v1/users", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
