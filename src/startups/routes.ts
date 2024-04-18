import express, { type Express } from "express";
import routerUser from "../routes/userRouter";

export const addRoutes = (app: Express): void => {
  app.use(express.json());
  app.use("/api/v1/users", routerUser);
};
