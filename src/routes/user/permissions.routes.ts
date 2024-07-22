import { Router } from "express"; // Importing Router from express
import {
  createPermission,
  getPermissions,
  updatePermission,deletePermission
} from "../../controllers/users/permission.controller"; // Importing controller functions

const Permission = Router(); // Creating a new Router instance
Permission.post("/create-permission", createPermission);
Permission.get("/get-permission", getPermissions);
Permission.put("/permission", updatePermission);
Permission.delete("/permission", deletePermission);
export default Permission; // Exporting the router
