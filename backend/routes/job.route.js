import { Router } from "express";

const jobRouter = Router();

// student ---------------------

// get all jobs
jobRouter.get("/", (req, res) => {
  res.send("Get all jobs");
});

// get job details
jobRouter.get("/:id/details", (req, res) => {
  res.send("Get job by details");
});

// Student applies for a job
jobRouter.post("/:jobId/details/apply", (req, res) => {
  res.send({ title: "Apply for job" });
});

// company ------------------------

// get all jobs for specific company
jobRouter.get("/company", (req, res) => {
  res.send("Get all jobs for each company");
});

// post job
jobRouter.post("/company", (req, res) => {
  res.send("Create new job");
});

// update job
jobRouter.patch("/company/:id", (req, res) => {
  res.send("Update job by id");
});

// delete job
jobRouter.delete("/company/:id", (req, res) => {
  res.send("Delete job by id");
});

export default jobRouter;
