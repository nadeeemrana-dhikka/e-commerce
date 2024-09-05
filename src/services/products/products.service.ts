import { AppDataSource } from "../../models/database/connection";
import { Product } from "../../models/entities/products/products.entity";
const productRepository = AppDataSource.getRepository(Product);

export const getAllProducts = async () => {
  const products = await productRepository.find();
  return products;
};

export const getProductViaId = async (id: number) => {
  const product = await productRepository.findOne({ where: { id } });
  return product;
};

export const findProductByName = async (name: string) => {
  const product = await productRepository.findOne({ where: { name } });
  return product;
};

export const insertProductIntoDB = async (body: any) => {
  const product = new Product();
  product.name = body.name;
  product.description = body.description;
  product.price = body.price;
  product.category = body.category;
  product.stock = body.stock;
  product.brand = body.brand;
  product.imageUrl = body.imageUrl;
  product.rating = body.rating;
  product.reviews = body.reviews;
  product.isFeatured = body.isFeatured;
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
export const deleteProductFromDB = async (id: number) => {
  const deleteProduct = await productRepository.delete(id);
  if (!deleteProduct) {
    return null;
  }
  return deleteProduct;
};
