import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../user/user.entity'; // assuming a User entity exists

@Entity({name: 'Cart'})
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
  totalPrice!: number ;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
  
@DeleteDateColumn()
  deletedAt?: Date;
}
