import { Router } from "express";
const companyRouter = Router();

companyRouter.get("/profile", (req, res) => {
  res.send({ title: "Company Dashboard" });
});

companyRouter.patch("/update-profile", (req, res) => {
  res.send({ title: "Company Profile" });
});

export default companyRouter;
