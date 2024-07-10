import { Router } from "express"; // Importing Router from express
import { createRole}  from '../controllers/role.controller'// Importing controller functions

const role = Router(); // Creating a new Router instance
role.post("/create-role",createRole)
export default role; // Exporting the router
