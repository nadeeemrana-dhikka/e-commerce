import { Router } from "express";
import {
  asignPermissionToRole,
  asignRoleToUser,unasignPermissionFromRole
} from "../../controllers/users/asignPermission.controller";

const asignRouter = Router();

asignRouter.post("/asign-role", asignRoleToUser);
asignRouter.post("/asign-permission",asignPermissionToRole);
asignRouter.post("/unasign-permisson",unasignPermissionFromRole);
export default asignRouter;
