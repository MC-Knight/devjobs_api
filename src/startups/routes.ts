import express, { type Express } from "express";
import routerUser from "../routes/userRouter";
import routerJob from "../routes/jobRouter";
import routerJobRequirements from "../routes/requirementsRouter";
import routerJobRole from "../routes/roleRouter";

export const addRoutes = (app: Express): void => {
  app.use(express.json());
  app.use("/api/v1/users", routerUser);
  app.use("/api/v1/jobs", routerJob);
  app.use("/api/v1/job-requirements", routerJobRequirements);
  app.use("/api/v1/job-role", routerJobRole);
};
