import { Router } from "express"; // Importing Router from express
import {
    asignPermission
} from "../../controllers/user/asignPermission.controller"; // Importing controller functions

const asignPermissionRouter = Router(); // Creating a new Router instance
asignPermissionRouter.post("/asign-permission", asignPermission);
// Permission.post("/get-permission", getPermissions);

export default asignPermissionRouter; // Exporting the router
