import { Router } from "express";
import {
  assignPermissionToRole,
  assignRoleToUser,unassignPermissionFromRole
} from "../../controllers/user/asignPermission.controller";

const assignRouter = Router();

assignRouter.post("/assign-role", assignRoleToUser);
assignRouter.post("/assign-permission",assignPermissionToRole);
assignRouter.post("/unassign-permisson", unassignPermissionFromRole);
export default assignRouter;
