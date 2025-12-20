import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";


if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectToDatabase;
