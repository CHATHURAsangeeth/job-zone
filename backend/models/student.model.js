import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed
    university: { type: String },
    skills: [String],
    profile_image: { type: String }, // URL
    resume_url: { type: String }, // URL
    role: { type: String, default: "student" },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
