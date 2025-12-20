import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";
import companyRouter from "./routes/company.routes.js";

const app = express();

app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/companies", companyRouter);

app.get("/", (req, res) => {
  res.send("Welcome to job portal Backend!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
