import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable,OneToMany} from 'typeorm';
import { Category } from './category.entity'; // Adjust the path if needed
import { Cart } from '../orders/cart.entity'
@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ type: 'text', default: '' })
    description!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    price!: number;

    @Column({ default: 'Uncategorized' })
    category!: string;

    @Column({ default: 0 })
    stock!: number;

    @Column({ nullable: true })
    brand!: string;

    @Column({ nullable: true })
    imageUrl!: string;

    @Column({ type: 'decimal', nullable: true, precision: 2, scale: 1 })
    rating!: number;

    @Column({ type: 'int', nullable: true })
    reviews!: number;

    @Column({ default: false })
    isFeatured!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    // Many-to-many relationship with Category
    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable() // This decorator defines the join table for the many-to-many relationship
    categories!: Category[];
      // One-to-many relationship with Cart
      @OneToMany(() => Cart, (cart) => cart.product, { onDelete: 'CASCADE' })
      carts!: Cart[];
}
