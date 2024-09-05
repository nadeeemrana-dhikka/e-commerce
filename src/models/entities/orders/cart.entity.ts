import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../user/user.entity'; // Assuming a User entity exists
import { Order } from '../orders/order.entity'; // Importing Order entity

@Entity({name: 'cart'})
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;
 
  @Column('int')
  userId!: number;

  @Column('int')
  productId!: number;

  @Column('int')
  quantity!: number;

  @Column('int')
  price!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice!: number;

  @ManyToOne(() => Order, (order) => order.cartItems)
  order!: Order; // Creates relation to Order entity

  @Column('boolean')
  isOdered: boolean = false ;
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  
  @DeleteDateColumn()
  deletedAt?: Date;
}
