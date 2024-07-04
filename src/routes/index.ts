import { Router } from "express";
import  authRouter  from "./auth"

const rootRouter = Router();
rootRouter.use("/", authRouter);

export default rootRouter;

