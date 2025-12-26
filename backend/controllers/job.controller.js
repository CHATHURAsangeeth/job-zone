import mongoose from "mongoose";
import Job from "../models/job.model.js";
import Application from "../models/application.model.js";

export const getAllJobs = async (req, res, next) => {
  try {
    // Optional: Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Optional: Filtering by status
    const statusFilter = req.query.status || "active";

    const jobs = await Job.find({ status: statusFilter })
      .populate("company_id", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalJobs = await Job.countDocuments({ status: statusFilter });

    res.status(200).json({
      success: true,
      total: totalJobs,
      page,
      pageSize: jobs.length,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const postJob = async (req, res, next) => {
  const session = await Job.startSession();
  try {
    const { title, description, location, pay, hours, deadline } = req.body;

    // Validation
    if (!title || !description || !location || !pay || !hours || !deadline) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Auth check
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Role check (IMPORTANT)
    if (req.user.role !== "company") {
      return res.status(403).json({
        success: false,
        message: "Only companies can post jobs",
      });
    }

    session.startTransaction();
    const job = await Job.create({
      company_id: req.user.id,
      name: req.user.name,
      title,
      description,
      location,
      pay,
      hours,
      deadline,
      status: "active",
    });
    await session.commitTransaction();
    await session.endSession();

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      data: job,
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    res.status(500).json({ title: "S eerver Error", message: error.message });
    next(error);
  }
};

export const companyJobs = async (req, res, next) => {
  const session = await Job.startSession();

  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // pagiantion parameters

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const company_id = req.user.id;
    session.startTransaction();
    const jobs = await Job.find({ company_id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    await session.commitTransaction();
    await session.endSession();
    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    res.status(500).json({ title: "Server Error", message: error.message });
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const jobId = req.params.id; // job ID from URL

    if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
      // Check valid MongoDB ObjectId
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    // Fetch job and optionally populate company info
    const job = await Job.findById(jobId).populate("company_id", "name email");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
    console.error("Error fetching job by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const applyJob = async (req, res, next) => {
  const session = await mongoose.startSession();
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only students can apply for jobs",
      });
    }
    const { jobId } = req.params;
    const studentId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const alredyApplied = await Application.findOne({
      student_id: studentId,
      job_id: jobId,
    });
    if (alredyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }
    session.startTransaction();
    const application = await Application.create({
      student_id: studentId,
      job_id: jobId,
      status: "Pending",
    });

    await session.commitTransaction();
    await session.endSession();

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    next(error);
    console.error("Apply job error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateJobByCompany = async (req, res, next) => {
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

    const jobId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.company_id.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this job",
      });
    }

    const allowedUpdates = [
      "title",
      "description",
      "location",
      "pay",
      "hours",
      "deadline",
      "status",
    ];

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
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    await session.commitTransaction();
    await session.endSession();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    next(error);
    console.log("Update job error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res, next) => {
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
        message: "Only companies can delete jobs",
      });
    }

    const { id: jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (!job.company_id.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this job",
      });
    }

    session.startTransaction();

    await job.deleteOne();
    await session.commitTransaction();
    await session.endSession();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
    console.log("Delete job error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
