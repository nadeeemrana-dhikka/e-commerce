import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Order } from '../orders/order.entity'; // Assuming the Order entity exists

@Entity('payments')
export class Payment {

  @PrimaryGeneratedColumn()
  payment_id!: number;

  @ManyToOne(() => Order, (order) => order.payments)
  order!: Order; // Creates relation to Order entity

  @Column({ type: 'bigint' })
  user_id!: number;

  @Column({ type: 'varchar', length: 50 })
  payment_method!: string;

  @Column({ type: 'varchar', length: 100 })
  transaction_id!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: 'varchar', length: 10 })
  currency!: string;

  @Column({ type: 'varchar', length: 20 })
  payment_status!: string;

  @Column({ type: 'timestamp' })
  payment_date!: Date;

  @Column({ type: 'text', nullable: true })
  gateway_response!: string;

  @Column({ type: 'varchar', length: 50 })
  payment_ip!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
