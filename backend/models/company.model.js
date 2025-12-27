// models/Company.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact_number: { type: String },
    logo_url: { type: String },
    role: { type: String, default: "company", required: true },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
  