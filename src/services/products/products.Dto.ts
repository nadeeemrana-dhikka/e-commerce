import { IsString, IsNumber, IsOptional, IsDecimal, IsBoolean, IsInt, MaxLength } from 'class-validator';

export class ProductDTO {
    // Product Name
    @IsString()
    @MaxLength(255)
    name!: string;

    // Product Description
    @IsString()
    description: string = " ";

    // Product Price
    @IsInt()
    price!: number;

    // Product Category
    @IsString()
    @MaxLength(255)
    category!: string;

    // Stock Quantity
    @IsInt()
    stock!: number;

    // Product Brand
    @IsOptional()
    @IsString()
    @MaxLength(255)
    brand!: string;

    // URL of the Product Image
    @IsOptional()
    @IsString()
    imageUrl!: string;

    // Average Customer Rating
    @IsOptional()
    @IsDecimal({ decimal_digits: '2,1' })
    rating!: number;

    // Number of Reviews
    @IsOptional()
    @IsInt()
    reviews!: number;

    // Featured Product
    @IsBoolean()
    isFeatured!: boolean;

    // Timestamp, Product Created Date (usually handled by the database, no need for validation)
    createdAt!: Date;

    // Timestamp, Last Updated Date (usually handled by the database, no need for validation)
    updatedAt!: Date;
}


