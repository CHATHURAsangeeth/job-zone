// models/Application.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    company_name: { type: String },
    student_name: { type: String },
    student_email: { type: String },
    resume_url: { type: String },
    job_title: { type: String },
    job_location: { type: String },
    job_type: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Interview"],
      default: "Pending",
    },
    applied_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
