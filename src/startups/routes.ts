import express, { type Express } from "express";

export const addRoutes = (app: Express): void => {
  app.use(express.json());
};
