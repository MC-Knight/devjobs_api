import express from "express";
import JobController from "../controllers/jobController";
import upload from "../middleware/multer";
import authMiddleware from "../middleware/authMiddleware";
import isAdminMiddleware from "../middleware/verifyAccess";

const routerJob = express();

routerJob.post(
  "",
  authMiddleware,
  isAdminMiddleware,
  upload.single("logo"),
  JobController.createJob
);
routerJob.get("", JobController.getJobs);
routerJob.get("/:id", JobController.getJob);
routerJob.put(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  upload.single("logo"),
  JobController.updateJob
);
routerJob.delete(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  JobController.deleteJob
);

export default routerJob;
