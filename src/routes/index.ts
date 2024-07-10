import { Router } from "express";
import  user  from "./user"
import role from "./role"
const router = Router();
// router.use("/", oauth);
router.use("/", user);
router.use("/", role);
export default router;

