// models/Company.js
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    contact_number: { type: String },
    logo_url: { type: String },
    role: { type: String, default: "company" },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
