import { Router } from "express";
import { insertCart } from "../../controllers/orders/cart.controller";
import cookieParser from "cookie-parser";

const cart = Router();
cart.use(cookieParser());
cart.post("/cart-create", insertCart);
export default cart;