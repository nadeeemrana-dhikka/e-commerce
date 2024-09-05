import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../../controllers/products/products.controllers";
import { upload,  } from "../../middlewares/multer.middleware"; // Importing multer middleware for file uploads

const product = Router();
product.post("/product-create",upload.single('photos'), createProduct);
product.get("/products", getProducts);
product.get("/product/:id", getProductById);
product.put("/product/:id", updateProduct);
product.delete("/product/:id", deleteProduct);
export default product;