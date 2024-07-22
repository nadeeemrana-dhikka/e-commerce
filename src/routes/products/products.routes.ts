import { Router } from "express";
import { getProducts, getProductById } from "../../controllers/products/products.controllers";

const product = Router();

product.get("/products", getProducts);
product.get("/product/:id", getProductById);

export default product;