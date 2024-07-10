import { Router } from "express"; // Importing Router from express
import {
  createRole,
  getroles,
  updateRole,deleteRole
} from "../controllers/role.controller"; // Importing controller functions

const role = Router(); // Creating a new Router instance
role.post("/create-role", createRole);
role.get("/get-role", getroles);
role.put("/role", updateRole);
role.delete("/role", deleteRole);
export default role; // Exporting the router
