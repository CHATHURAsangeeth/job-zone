import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";
const studentRouter = Router();

studentRouter.get("/profile",getUser);

studentRouter.patch("/update-profile", (req, res) => {
  res.send({ title: "Student Profile" });
});

export default studentRouter;
