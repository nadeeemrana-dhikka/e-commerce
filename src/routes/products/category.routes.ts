import { Router } from "express";
import { createCategory } from "../../controllers/products/category.controllers";
const category = Router();
category.post("/category-create",createCategory);
// category.get("/category",getCategory);
// category.put("/category/:id",updateCategory);
// category.delete("/category/:id",updateCategory);
export default category;