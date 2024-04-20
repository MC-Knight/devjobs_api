import express from "express";
import RequirementController from "../controllers/jobRequirementsController";
import authMiddleware from "../middleware/authMiddleware";
import isAdminMiddleware from "../middleware/verifyAccess";

const routerJobRequirements = express();

routerJobRequirements.post(
  "",
  authMiddleware,
  isAdminMiddleware,
  RequirementController.createRequirement
);
routerJobRequirements.put(
  "",
  authMiddleware,
  isAdminMiddleware,
  RequirementController.updateRequirement
);

export default routerJobRequirements;
