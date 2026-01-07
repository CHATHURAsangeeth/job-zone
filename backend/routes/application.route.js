import { Router } from "express";
import { companyApplications, studentApplications, updateApplicationByCompany } from "../controllers/application.controller.js";
const applicationRouter = Router();

//  sees all own applications
applicationRouter.get("/", (req, res) => {
  res.send({ title: "get all applications for therir role" });
});

// all applications for their job postings
applicationRouter.get("/company", companyApplications);

// all applications who student applied
applicationRouter.get("/student", studentApplications);

// update application by company
applicationRouter.patch("/company/:id", updateApplicationByCompany);

// specefic applications for their job
applicationRouter.get("/company/:applicationID", (req, res) => {
  res.send({ title: "Company specific applicants in there profile" });
});

export default applicationRouter;
