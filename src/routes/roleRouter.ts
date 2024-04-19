import express from "express";
import RoleController from "../controllers/jobRoleController";

const routerJobRole = express();

routerJobRole.post("", RoleController.createRole);
routerJobRole.put("/:id", RoleController.updateRole);

export default routerJobRole;
