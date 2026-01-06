import mongoose from "mongoose";
import Application from "../models/application.model.js";

export const companyApplications = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const company_id = req.user.id;

    const applications = await Application.find({ company_id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Applications fetched successfully",
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({ title: "Server Error", message: error.message });
    next(error);
  }
};

// updateApplication
export const updateApplicationByCompany = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Only companies can update jobs",
      });
    }

    const applicationId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "application not found",
      });
    }

    if (application.company_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this job",
      });
    }

    const allowedUpdates = ["status"];

    const updates = {};
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    session.startTransaction();
    const updatedJob = await Application.findByIdAndUpdate(
      applicationId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    await session.commitTransaction();
    await session.endSession();

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    next(error);
    console.log("Update application error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
