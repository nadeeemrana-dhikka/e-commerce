import { Request, Response, NextFunction } from "express";
import { CartDto } from "../../services/orders/cart.Dto";
import {
  createCartToDB,
  updateCartItemQuantity,
  findCartByUserIdAndProductId,
  getAllCartByuserId, 
} from "../../services/orders/cart.service";
import { JWT_SECRET } from "../../models/database/secrets";
import { validateDto } from "../../utility/validateDto";
import { jwtVerification } from "../../utility/jwtVerification";
export const insertCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // jwt validation and authorization here

    // const token = req.cookies.accessToken;
    // console.log(token);
    const token = req.headers;
    console.log(token);
    if (!JWT_SECRET) {
      return next(new Error("JWT_SECRET not found"));
    }
    const user = await jwtVerification(req, next);
    // console.log(user["id"]);
    req.body.userId = user?.id;

    const { quantity, productId, price } = req.body;
    req.body.totalPrice = quantity * price;
    // check if same item is already in cart
    const cart = await findCartByUserIdAndProductId(user?.id, productId);
    if (cart) {
      const cartquantity = cart.quantity + quantity;
      cart.quantity = cartquantity;
      cart.totalPrice = cartquantity * price;
      await updateCartItemQuantity(cart);
      res.status(200).json(cart);
    }
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
    return next(error);
  }
};

export const totalCartPrice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    if (!JWT_SECRET) {
      return next(new Error("JWT_SECRET not found"));
    }
    const user = await jwtVerification(req, next);
    const userid = user?.id;
    const allCartItems = await getAllCartByuserId(userid);

    let totalPriceOfCart = 0;
    allCartItems.forEach((item) => {
      totalPriceOfCart += Number(item.totalPrice);
    });
    console.log(totalPriceOfCart);
    res.status(200).json(totalPriceOfCart);
  } catch (error) {
    return next(error);
  }
};

export const getAllCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization;
    // console.log("token printed in verify",token);
    const user = await jwtVerification(req, next);
    const cart = await getAllCartByuserId(user?.id);
    console.log(user?.id);

    res.status(200).json(cart;
  } catch (error) {
    return next(error);
  }
};
