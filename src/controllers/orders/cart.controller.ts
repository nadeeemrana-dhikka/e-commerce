import { Request, Response, NextFunction } from "express";
import { CartDto } from "../../services/orders/cart.Dto";
import {
  createCartToDB,
  updateCartItemQuantity,
  findCartByUserIdAndProductId,
  getAllCartUnOdered,
} from "../../services/orders/cart.service";
import { JWT_SECRET } from "../../models/database/secrets";
import { validateDto } from "../../utility/validateDto";
import { jwtVerification } from "../../utility/jwtVerification";
import { checkIfUserIsAdmin } from '../../services/users/user.service'
import { getProductViaId } from "../../services/products/products.service"
import { promises } from "dns";


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
    if (!user) {
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>", user.id)
    const admin = await checkIfUserIsAdmin(user.id)
    if (admin) {
      return res.status(400).json({ "message": "Only Customer can do this" })
    }
    req.body.userId = user?.id;

    const { quantity, productId } = req.body;
    // req.body.totalPrice = quantity * price;
    // check if same item is already in cart
    const product = await getProductViaId(productId)
    if (!product) {
      return next("item not exist");
    }
    const cart = await findCartByUserIdAndProductId(user?.id, productId);
    if (cart) {
      const cartquantity = cart.quantity + quantity;
      cart.quantity = cartquantity;
      cart.totalPrice = cartquantity * product.price;
      console.log("updated cart id", cart.id)
      const updatedCart = await updateCartItemQuantity(cart);
      return res.status(200).json(cart);
    }
    const validate = await validateDto(req.body, CartDto, next);
    if (!validate) {
      return next(new Error("Invalid request"));
    }
    const userId = user.id;
    const price = product.price;
    const totalPrice = product
      .price * quantity;
    // create order
    const order = await createCartToDB({ userId, productId, quantity, price, totalPrice });
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
    const user = await jwtVerification(req, next);
    if (!user) {
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>", user.id)
    const admin = await checkIfUserIsAdmin(user.id)
    if (admin) {
      return res.status(400).json({ "message": "Only Customer can do this" })
    }

    const userid = user?.id;
    const allCartItems = await getAllCartUnOdered(userid);

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
    const user = await jwtVerification(req, next);
    if (!user) {
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>", user.id)
    const admin = await checkIfUserIsAdmin(user.id)
    if (admin) {
      return res.status(400).json({ "message": "Only customer can do this" })
    }
    const cart = await getAllCartUnOdered(user?.id);
    console.log(user?.id);

    res.status(200).json(cart);
  } catch (error) {
    return next(error);
  }
};