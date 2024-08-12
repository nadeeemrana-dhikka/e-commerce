import { Router } from "express";
import user from "./user/users.routes";
import role from "./user/roles.routes";
import permissions from "./user/permissions.routes";
import asignPermission from "./user/asignPermissions.routes";
import product from "../routes/products/products.routes";
import cart from "./orders/cart.routes";
import cookieParser from "cookie-parser";

const router = Router();
router.use(cookieParser());

// router.use("/", oauth);
router.use("/", user);
router.use("/", role);
router.use("/", permissions);
router.use("/", asignPermission);
router.use("/", product);
router.use("/", cart);

export default router;
