import Company from "../models/company.model.js";
import Student from "../models/student.model.js";


export const getUser = async (req, res, next) => {
  try {
    // Check if user is logged in
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    let user;

    // Fetch user based on role
    if (req.user.role === "company") {
      user = await Company.findById(req.user.id);
    } else {
      user = await Student.findById(req.user.id);
    }

    // If user not found
    if (!user) {
      const error = new Error("Invalid email or User not found");
      error.statusCode = 404;
      throw error;
    }

    // Success response
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
