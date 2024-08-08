// create-cart.service.ts
import { Cart } from "../../models/entities/orders/cart.entity";
import { CartDto } from "./cart.Dto";
import { AppDataSource } from "../../models/database/connection";
const cartRepository = AppDataSource.getRepository(Cart);

// Existing methods...
export async function createCartToDB(
  createCartDto: CartDto
): Promise<Cart> {
  const cart = cartRepository.create(createCartDto);
  return await cartRepository.save(cart);
}

export async function getAllCartsToDB(): Promise<Cart[]> {
  return await cartRepository.find();
}