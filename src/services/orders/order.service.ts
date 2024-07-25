// src/services/order.service.ts
import { Order } from '../../models/entities/orders/order.entity';
import { CreateOrderDto,UpdateOrderDto } from './order.Dto';
import { AppDataSource } from '../../models/database/connection';
const orderRepository = AppDataSource.getRepository(Order);



// Read
// src/services/order.service.ts
export class OrderService {
  // Existing methods...
  async createOrderToDB(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = orderRepository.create(createOrderDto);
    return await orderRepository.save(order);
  }
  async getAllOrdersToDB(): Promise<Order[]> {
    return await orderRepository.find();
  }

  async getOrderByIdToDB(id: number) {
     const order =await orderRepository.findOne({ where: { id } });
     if(!order || undefined){
       return null;
     }
    return order
  }

  async getOrdersByUserToDB(id: number): Promise<Order[]> {
    return await orderRepository.find({ where: { id } });
  }

  async getOrdersByStatusToDB(status: string): Promise<Order[]> {
    return await orderRepository.find({ where: { status } });
  }

  async updateOrderToDB(id: number, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
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

  async deleteOrderToDB(id: number): Promise<boolean> {
    const result = await orderRepository.delete(id);
    if(result.affected == 0 || null || undefined){
      return false;
    }else{
      return true;
    }
  }
}