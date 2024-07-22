// src/controllers/order.controller.ts
import { Request, Response } from 'express';
import { OrderService } from '../../services/orders/order.service';
import { CreateOrderDto,UpdateOrderDto } from '../../services/orders/order.Dto';

 
// Read
// src/controllers/order.controller.ts
export class OrderController {

    private orderService = new OrderService();
  

  public createOrder = async (req: Request, res: Response) => {
    const createOrderDto: CreateOrderDto = req.body;
    try {
      const order = await this.orderService.createOrderToDB(createOrderDto);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: 'Error creating order', error });
    }
  };

    public getAllOrders = async (req: Request, res: Response) => {
      try {
        const orders = await this.orderService.getAllOrdersToDB();
        res.status(200).json(orders);
      } catch (error) {
        res.status(400).json({ message: 'Error retrieving orders', error });
      }
    };
  
    public getOrderById = async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const order = await this.orderService.getOrderByIdToDB(Number(id));
        if (order) {
          res.status(200).json(order);
        } else {
          res.status(404).json({ message: 'Order not found' });
        }
      } catch (error) {
        res.status(400).json({ message: 'Error retrieving order', error });
      }
    };
  
    public getOrdersByUser = async (req: Request, res: Response) => {
      const { userId } = req.query;
      try {
        const orders = await this.orderService.getOrdersByUserToDB(Number(userId));
        res.status(200).json(orders);
      } catch (error) {
        res.status(400).json({ message: 'Error retrieving orders', error });
      }
    };
  
    public getOrdersByStatus = async (req: Request, res: Response) => {
      const { status } = req.query;
      try {
        const orders = await this.orderService.getOrdersByStatusToDB(status as string);
        res.status(200).json(orders);
      } catch (error) {
        res.status(400).json({ message: 'Error retrieving orders', error });
      }
    };

    public updateOrder = async (req: Request, res: Response) => {
        const { id } = req.params;
        const updateOrderDto: UpdateOrderDto = req.body;
        try {
          const updatedOrder = await this.orderService.updateOrderToDB(Number(id), updateOrderDto);
          if (updatedOrder) {
            res.status(200).json(updatedOrder);
          } else {
            res.status(404).json({ message: 'Order not found' });
          }
        } catch (error) {
          res.status(400).json({ message: 'Error updating order', error });
        }
      };

      public deleteOrder = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
          const deleted = await this.orderService.deleteOrderToDB(Number(id));
          if (deleted) {
            res.status(200).json({ message: 'Order deleted successfully' });
          } else {
            res.status(404).json({ message: 'Order not found' });
          }
        } catch (error) {
          res.status(400).json({ message: 'Error deleting order', error });
        }
      };

  }
  

  