// src/dto/create-order.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  userId!: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice!: number;

  @IsNotEmpty()
  @IsString()
  status!: string;
}

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
