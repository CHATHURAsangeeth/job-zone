import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import Company from "../models/company.model.js";
import Student from "../models/student.model.js";

export const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      res.status(401).json({ message: "Unauthorized: No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);

    let userRole = decoded.role;

    let user;
    if (userRole === "company") {
      user = await Company.findById(decoded.userId);
    } else {
      user = await Student.findById(decoded.userId);
    }

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
