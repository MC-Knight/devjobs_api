import express from "express";
import RoleController from "../controllers/jobRoleController";
import authMiddleware from "../middleware/authMiddleware";
import isAdminMiddleware from "../middleware/verifyAccess";

const routerJobRole = express();

routerJobRole.post(
  "",
  authMiddleware,
  isAdminMiddleware,
  RoleController.createRole
);
routerJobRole.put(
  "/:id",
  authMiddleware,
  isAdminMiddleware,
  RoleController.updateRole
);

export default routerJobRole;
