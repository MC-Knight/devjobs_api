import express from "express";
import JobController from "../controllers/jobController";
import upload from "../middleware/multer";

const routerJob = express();

routerJob.post("", upload.single("logo"), JobController.createJob);
routerJob.get("", JobController.getJobs);
routerJob.get("/:id", JobController.getJob);
routerJob.put("/:id", upload.single("logo"), JobController.updateJob);
routerJob.delete("/:id", JobController.deleteJob);

export default routerJob;
