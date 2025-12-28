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

    const applications = await Application.find({ company_id }).sort({ createdAt: -1 });
    

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
