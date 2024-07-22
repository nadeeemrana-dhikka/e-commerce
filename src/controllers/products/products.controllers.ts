import { NextFunction, Request, Response } from "express";
import { ProductDTO } from "../../services/products/products.Dto";
import { ApiError } from "../../utility/ApiError";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import {
  getAllProducts,
  getProduct,
  findProductByName,
  insertProductIntoDB,
  updateProductInDB,
} from "../../services/products/products.services";
import { validateDto } from "../../utility/validateDto";
// insert a product but check using productDto
export const insertProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    // Validate input using class-validator
    const input = plainToInstance(ProductDTO, req.body); // Transforming plain object to class instance
    const validationErrors = await validate(input); // Validating the input
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .flat();
      return next({ message: errorMessages }); // Pass validation errors to the error handler
    }
    // find the product by name
    const product = await findProductByName(name);
    if (product) {
      return next(new Error("Product already exists")); // If product exists, send error
    }
    // insert the product
    const saveProduct = await insertProductIntoDB(name);
    if (saveProduct == null) {
      return next(new Error("Product not saved")); // If product not saved, send error
    }
    res.status(200).json({ message: "Product save" });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const products = await getAllProducts();
    if (!products) {
      throw new ApiError(400, "No products found");
    }
    res.send(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const product = await getProduct(Number(id));
    if (!product) {
      throw new ApiError(400, "Product not found");
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      category,
      stock,
      brand,
      imageUrl,
      rating,
      reviews,
      isFeatured,
    } = req.body;
    const validate = await validateDto(req.body, ProductDTO, next);
    if (!validate) {
      return next(new Error("Invalid request"));
    }
    // find the product by id
    const product = await getProduct(Number(id));
    if (!product) {
      return next(new Error("Product not found")); // If product not found, send error
    }
    // delete from request body of  product rating and reviews
    delete req.body.rating;
    delete req.body.reviews;

    product.name = name;
    product.price = price;
    product.category = category;
    product.stock = stock;
    product.brand = brand;
    product.imageUrl = imageUrl;
    product.isFeatured = isFeatured;
    // check all fields are valid or not
    const details = validateDto(product, ProductDTO, next);
    if (!details) {
      const updatedProduct = await updateProductInDB(product.id, product);
      if (!updatedProduct) {
        return next(new Error("Product not updated")); // If product not updated, send error
      }
      // update the product
      res.status(200).json({ message: "Product updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};
