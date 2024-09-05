// create-cart.service.ts
import { Cart } from "../../models/entities/orders/cart.entity";
import { CartDto } from "./cart.Dto";
import { AppDataSource } from "../../models/database/connection";
const cartRepository = AppDataSource.getRepository(Cart);

// Existing methods...
export async function createCartToDB(cart:any): Promise<Cart> {
  // const cart = cartRepository.create(createCartDto);
  console.log("cart =>>>>",cart)
  return await cartRepository.save(cart);
}

export async function getAllCartsToDB(): Promise<Cart[]> {
  return await cartRepository.find();
}

export async function findCartByUserIdAndProductId(
  userId: number,
  productId: number
) {
  return await cartRepository.findOne({
    where: { userId, productId },
  });
}

export async function updateCartItemQuantity(cartData: any) {
  const { userId, productId, quantity,totalPrice ,id} = cartData;
  const result = await cartRepository.createQueryBuilder()
  .update(Cart)
  .set({ quantity, totalPrice }) // Set updated fields
  .where("id", {id})
  .execute();

  if (result.affected === 0) {
    throw new Error("Cart not found");
  }
  return result;
}
// export const getAllCartByuserId=async(userId:number) => {
//   return await cartRepository.find({where: { userId,isOdered:false}})
//  }

export const getAllCartUnOdered=async(userId:number) => {
 return await cartRepository.find({where: { userId,isOdered:false}})
}