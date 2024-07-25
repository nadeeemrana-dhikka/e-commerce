import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../../controllers/products/products.controllers";

const product = Router();
product.post("/product-create", createProduct);
product.get("/products", getProducts);
product.get("/product/:id", getProductById);
product.put("/product/:id", updateProduct);
product.delete("/product/:id", deleteProduct);
export default product;