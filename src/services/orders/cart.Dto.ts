import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class CartDto {
  @IsNotEmpty()
  productId!: number;
  }
