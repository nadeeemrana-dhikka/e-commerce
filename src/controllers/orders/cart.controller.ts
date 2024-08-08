import { Request, Response, NextFunction } from "express";
import { CartDto } from "../../services/orders/cart.Dto";
import { createCartToDB } from "../../services/orders/cart.service";
import { JWT_SECRET } from "../../models/database/secrets";
import jwt, { JwtPayload } from "jsonwebtoken";
import { validateDto } from "../../utility/validateDto";
export const insertCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // jwt validation and authorization here

    const token = req.cookies.accessToken;
    // console.log(token);
    console.log(JWT_SECRET);
    if (!JWT_SECRET) {
      return next(new Error("JWT_SECRET not found"));
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
      return next(new Error("Invalid token"));
    }
    const user = jwt.decode(token);
    if (!user || typeof user === "string") {
      return next(new Error("User not found"));
    }

    console.log(user["id"]);
    req.body.userId = user["id"];

    const { quantity, productId, price } = req.body;
    req.body.totalPrice = quantity * price;

    const validate = await validateDto(req.body, CartDto, next);
    if (!validate) {
      return next(new Error("Invalid request"));
    }
    // create order
    const order = await createCartToDB(req.body);
    if (!order) {
      return next(new Error("Order not created"));
    }
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

