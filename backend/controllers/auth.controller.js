import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import Student from "../models/student.model.js";
import Company from "../models/company.model.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const {
      name,
      email,
      password,
      role,
      contact_number,
      logo_url,
      university,
      skills,
      profile_image,
      resume_url,
    } = req.body;

    session.startTransaction();

    // Determine user role
    const userRole = role === "company" ? "company" : "student";

    // Check if user already exists
    const existingUser =
      userRole === "company"
        ? await Company.findOne({ email }).session(session)
        : await Student.findOne({ email }).session(session);

    if (existingUser) {
      const error = new Error("User with this email already exists");
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;

    if (userRole === "company") {
      newUser = await Company.create(
        [
          {
            name,
            email,
            password: hashedPassword,
            contact_number,
            logo_url,
            role: "company",
          },
        ],
        { session }
      );
    } else {
      newUser = await Student.create(
        [
          {
            name,
            email,
            password: hashedPassword,
            university,
            skills: skills || [],
            profile_image,
            resume_url,
            role: "student",
          },
        ],
        { session }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    await session.commitTransaction();
    await session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUser[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};
