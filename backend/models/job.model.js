// models/Job.js
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    pay: { type: Number },
    hours: { type: String }, // e.g., "Part-time 20h/week"
    deadline: { type: Date },
    status: { type: String, enum: ["active", "closed"], default: "active" },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
