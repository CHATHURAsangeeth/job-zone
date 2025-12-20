import { Router } from "express";
const studentRouter = Router();

studentRouter.get("/profile", (req, res) => {
  res.send({ title: "Student Dashboard" });
});

studentRouter.patch("/update-profile", (req, res) => {
  res.send({ title: "Student Profile" });
});

export default studentRouter;
