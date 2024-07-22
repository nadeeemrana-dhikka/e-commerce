import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
    // Primary Key, Auto Increment
    @PrimaryGeneratedColumn()
    id!: number;

    // Product Name
    @Column()
    name!: string;

    // Product Description
    @Column('text')
    description!: string;

    // Product Price
    @Column('decimal')
    price!: number;

    // Product Category
    @Column()
    category!: string;

    // Stock Quantity
    @Column()
    stock!: number;
    
    // Product Brand
    @Column({ nullable: true })
    brand!: string;

    // URL of the Product Image
    @Column({ nullable: true })
    imageUrl!: string;

    // Average Customer Rating
    @Column({ type: 'decimal', nullable: true, precision: 2, scale: 1 })
    rating!: number;

    // Number of Reviews
    @Column({ type: 'int', nullable: true })
    reviews!: number;

    // Featured Product
    @Column({ default: false })
    isFeatured!: boolean;

    // Timestamp, Product Created Date
    @CreateDateColumn()
    createdAt!: Date;

    // Timestamp, Last Updated Date
    @UpdateDateColumn()
    updatedAt!: Date;
}
