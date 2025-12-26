import { Router } from "express";
import {
  applyJob,
  companyJobs,
  deleteJob,
  getAllJobs,
  getJobById,
  postJob,
  updateJobByCompany,
} from "../controllers/job.controller.js";

const jobRouter = Router();

// student ---------------------

// get all jobs
jobRouter.get("/", getAllJobs);

// get job details
jobRouter.get("/:id/details", getJobById);

// Student applies for a job
jobRouter.post("/:jobId/details/apply", applyJob);

// company ------------------------

// get all jobs for specific company
jobRouter.get("/company", companyJobs);

// post job
jobRouter.post("/company", postJob);

// update job
jobRouter.patch("/company/:id", updateJobByCompany);

// delete job
jobRouter.delete("/company/:id", deleteJob);

export default jobRouter;
