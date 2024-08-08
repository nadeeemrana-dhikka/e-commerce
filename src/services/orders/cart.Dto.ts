import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class CartDto {
  @IsNotEmpty()
  userId!: number;

  @IsNotEmpty()
  productId!: number;

  @IsNotEmpty()
  @IsNumber()
  price!: number;
  
  @IsNotEmpty()
  @IsNumber()
  totalPrice!: number ;

}
