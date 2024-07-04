import { Router } from "express";
import  user  from "./user"

const router = Router();
// router.use("/", oauth);
router.use("/", user);

export default router;

