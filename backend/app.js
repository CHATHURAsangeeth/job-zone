import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { PORT, CLIENT_URL } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";
import companyRouter from "./routes/company.routes.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middleware.js/error.middleware.js";
import cookieParser from "cookie-parser";
import { authorize } from "./middleware.js/auth.middleware.js";
import cors from "cors";
import { getAllJobs } from "./controllers/job.controller.js";
import studentRouter from "./routes/student.route.js";

const app = express();
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users",authorize, studentRouter);
app.use("/api/jobs", authorize, jobRouter);
app.use("/api/allJobs", getAllJobs);
app.use("/api/applications", authorize, applicationRouter);
app.use("/api/companies", authorize, companyRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to job portal Backend!");
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});
