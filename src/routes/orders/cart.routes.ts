import { Router } from "express";
import { insertCart, totalCartPrice, getAllCart,   } from "../../controllers/orders/cart.controller";
import cookieParser from "cookie-parser";

const cart = Router();
cart.use(cookieParser());
cart.post("/cart-create", insertCart);
cart.get("/total-cart-price", totalCartPrice);
cart.get("/get-cart",getAllCart);
 export default cart;