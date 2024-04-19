import express from "express";
import RequirementController from "../controllers/jobRequirementsController";

const routerJobRequirements = express();

routerJobRequirements.post("", RequirementController.createRequirement);
routerJobRequirements.put("/:id", RequirementController.updateRequirement);

export default routerJobRequirements;
