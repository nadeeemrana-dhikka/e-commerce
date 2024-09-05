// src/controllers/order.controller.ts
import { Request, Response, NextFunction } from "express";
import { createOrderToDB, getAllOrdersToDB, getOrderByIdToDB, getOrdersByUserToDB, getOrdersByStatusToDB, updateOrderToDB, deleteOrderToDB } from "../../services/orders/order.service";
import {
  CreateOrderDto,
  UpdateOrderDto,
} from "../../services/orders/order.Dto";
import { jwtVerification } from "../../utility/jwtVerification";
import { JWT_SECRET } from "../../models/database/secrets";
import {checkIfUserIsAdmin } from '../../services/users/user.service'
import { getAllCartUnOdered } from '../../services/orders/cart.service'
// Read
// src/controllers/order.controller.ts

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const createOrderDto: CreateOrderDto = req.body;
    const token = req.headers;
    console.log(token);
    if (!JWT_SECRET) {
      return next(new Error("JWT_SECRET not found"));
    }
   
    const user = await jwtVerification(req,next);
    if(!user){
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>",user.id)
   const admin =await checkIfUserIsAdmin(user.id)
   if(admin){
    return res.status(400).json({"message": "Only Customer can do this"})
   }    
   req.body.userId = user?.id;
    const cart =await getAllCartUnOdered(user.id);
    let order
    console.log(cart);
  cart.forEach( async(item) => {
      const items ={
          id: item.id,
          userId: item.userId,
          productId: item.productId,
         quantity: item.quantity,
          price: item.price,
          totalPrice: item.totalPrice
      }
      await createOrderToDB(items);
  });
  
    // const order = await createOrderToDB();

    if(!order){
      return next(new Error("Order not created"));
    }
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await getAllOrdersToDB();
    if(!orders){
      return next(new Error("Orders not found"));
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const order = await getOrderByIdToDB(Number(id));
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getOrdersByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.query;
  try {
    const orders = await getOrdersByUserToDB(Number(userId));
    if(!orders){
      return next(new Error("Orders not found"));
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrdersByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status } = req.query;
  try {
    const orders = await getOrdersByStatusToDB(
      status as string
    );
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const updateOrderDto: UpdateOrderDto = req.body;
  try {
    const updatedOrder = await updateOrderToDB(
      Number(id),
      updateOrderDto
    );
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deleted = await deleteOrderToDB(Number(id));
    if (deleted) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    next(error);
  }
};
