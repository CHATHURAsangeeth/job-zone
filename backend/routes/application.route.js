import { Router } from "express";
const applicationRouter = Router();

//  sees all own applications
applicationRouter.get("/", (req, res) => {
  res.send({ title: "get all applications for therir role" });
});

//company

// all applications for their job postings
applicationRouter.get("/company", (req, res) => {
  res.send({ title: "Company sees all applicants " });
});

// specefic applications for their job
applicationRouter.get("/company/:applicationID", (req, res) => {
  res.send({ title: "Company specific applicants in there profile" });
});

export default applicationRouter;
