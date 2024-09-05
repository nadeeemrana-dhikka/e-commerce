import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity'; // Assuming a User entity exists
import { Payment } from '../orders/payment.entity'; // Assuming Payment entity exists
import { Cart } from '../orders/cart.entity'; // Importing Cart entity

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments!: Payment[]; // Establishes the one-to-many relation with Payment

  @OneToMany(() => Cart, (cart) => cart.order)
  cartItems!: Cart[]; // Establishes the one-to-many relation with Cart

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice!: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'canceled'],
    default: 'pending',
  })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
