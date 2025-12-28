import { Router } from "express";
import { companyApplications } from "../controllers/application.controller.js";
const applicationRouter = Router();

//  sees all own applications
applicationRouter.get("/", (req, res) => {
  res.send({ title: "get all applications for therir role" });
});

//company

// all applications for their job postings
applicationRouter.get("/company",companyApplications);

// specefic applications for their job
applicationRouter.get("/company/:applicationID", (req, res) => {
  res.send({ title: "Company specific applicants in there profile" });
});

export default applicationRouter;
