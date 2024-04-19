import express, { type Express } from "express";
import routerUser from "../routes/userRouter";
import routerJob from "../routes/jobRouter";

export const addRoutes = (app: Express): void => {
  app.use(express.json());
  app.use("/api/v1/users", routerUser);
  app.use("/api/v1/jobs", routerJob);
};
