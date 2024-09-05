// src/services/order.service.ts
import { Order } from "../../models/entities/orders/order.entity";
import { CreateOrderDto, UpdateOrderDto } from "./order.Dto";
import { AppDataSource } from "../../models/database/connection";
const orderRepository = AppDataSource.getRepository(Order);

// Existing methods...
export async function createOrderToDB(
  order: any
): Promise<Order> {
  // const order = orderRepository.create(createOrderDto);
  return await orderRepository.save(order);
}
export async function getAllOrdersToDB(): Promise<Order[]> {
  return await orderRepository.find();
}

export async function getOrderByIdToDB(id: number) {
  const order = await orderRepository.findOne({ where: { id } });
  if (!order) {
    return null;
  }
  return order;
}
export async function getOrdersByUserToDB(id: number): Promise<Order[]> {
  return await orderRepository.find({ where: { id } });
}

export async function getOrdersByStatusToDB(status: string): Promise<Order[]> {
  return await orderRepository.find({ where: { status } });
}

export async function updateOrderToDB(
  id: number,
  updateOrderDto: UpdateOrderDto
): Promise<Order | null> {
  const order = await orderRepository.findOne({ where: { id } });
  if (order) {
    if (updateOrderDto.totalPrice !== undefined) {
      order.totalPrice = updateOrderDto.totalPrice;
    }
    if (updateOrderDto.status !== undefined) {
      order.status = updateOrderDto.status;
    }
    return await orderRepository.save(order);
  }
  return null;
}

export async function deleteOrderToDB(id: number) {
  const result = await orderRepository.delete(id);
  if (result.affected == 0) {
    return false;
  } else {
    return true;
  }
}
