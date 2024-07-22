import { AppDataSource } from "../../models/database/connection";
import { Product } from "../../models/entities/products/products.entity";
const productRepository = AppDataSource.getRepository(Product);

export const getAllProducts = async () => {
  const products = await productRepository.find();
  return products;
};

export const getProduct = async (id: number) => {
  const product = await productRepository.findOne({ where: { id } });
  return product;
};

export const findProductByName = async (name: string) => {
  const product = await productRepository.findOne({ where: { name } });
  return product;
};

export const insertProductIntoDB = async (name: string) => {
  const product = new Product();
  product.name = name;
  const saveProduct = await productRepository.save(product);
  if (!saveProduct) {
    return null;
  }
  return saveProduct;
};

export const updateProductInDB = async (id: number, product: {}) => {
  // update the product usign the id
    const updatedProduct = await productRepository.update(id, product);
    if (!updatedProduct) {
      return null;
    }
    return updatedProduct;
};