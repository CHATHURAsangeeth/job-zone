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
    student_name: { type: String, required: true },
    student_email: { type: String, required: true },
    job_title: { type: String},
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    applied_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
