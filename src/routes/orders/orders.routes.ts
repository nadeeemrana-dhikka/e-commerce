import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  updateOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  getOrdersByStatus,
} from "src/controllers/orders/order.controller";

const orders = Router();
orders.post("/orders-create", createOrder);
orders.get("/orders", getAllOrders);
orders.get("/order/:id", getOrderById);
// orders.get("/orders-by-user", getOrdersByUser);
orders.get("/orders-by-status", getOrdersByStatus);
orders.put("/order/:id", updateOrder);
orders.delete("/order/:id", deleteOrder);
export default orders;
