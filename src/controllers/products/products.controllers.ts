import { NextFunction, Request, Response } from "express";
import { ProductDTO } from "../../services/products/products.Dto";
import { ApiError } from "../../utility/ApiError";
import {
  getAllProducts,
  getProductViaId,
  findProductByName,
  insertProductIntoDB,
  updateProductInDB,
  deleteProductFromDB,
} from "../../services/products/products.service";

import { checkIfUserIsAdmin } from '../../services/users/user.service'
import { validateDto } from "../../utility/validateDto";
import { uploadOnCloudinary } from "../../utility/cloudinary"; // Importing function to upload images to Cloudinary
import { jwtVerification } from "../../utility/jwtVerification"

// insert a product but check using productDto
export const createProduct = async (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  try {
    // const { name, rating, } = req.body;
    // Convert rating to a number if it is a string
    const user = await jwtVerification(req, next);
    if (!user) {
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>", user.id)
    const admin = await checkIfUserIsAdmin(user.id)
    if (!admin) {
      return res.status(400).json({ "message": "Only Admin can do this" })
    }
    if (typeof req.body.rating === 'string') {
      const parsedRating = parseFloat(req.body.rating);
      if (isNaN(parsedRating)) {
        return next({ message: ['Rating must be a valid decimal number.'] }); // Pass error if conversion fails
      }
      req.body.rating = parsedRating;
    }

    // Validate input using class-validator
    // validateDto(req.body, ProductDTO, next);
    // find the product by name
    // const product = await findProductByName(name);
    // if (product) {
    //   return next(new Error("Product already exists")); // If product exists, send error
    // }
    // insert the product
    const filePath = req.file?.path; // Getting file path from request
    const originalname = req.file?.filename; // Getting original file name from request
    console.log(filePath)
    let profile = "";
    // if (filePath && originalname) {
    let cloudinaryResponse = await uploadOnCloudinary(filePath, originalname); // Uploading file to Cloudinary
    if (!cloudinaryResponse) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary" }); // If upload fails, send error
    }
    profile = cloudinaryResponse.secure_url;
    // }
    console.log(profile)
    req.body.imageUrl = profile;
    const saveProduct = await insertProductIntoDB(req.body);
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
    const product = await getProductViaId(Number(id));
    if (!product) {
      throw new ApiError(400, "Product not found");
    }
    res.send(product);
  } catch (error) {
    next(error);
  }
};


export const getProductsByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productName } = req.params;
    const product = await findProductByName(productName);
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
    const user = await jwtVerification(req, next);
    if (!user) {
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>", user.id)
    const admin = await checkIfUserIsAdmin(user.id)
    if (!admin) {
      return res.status(400).json({ "message": "Only Admin can do this" })
    }
    const validate = await validateDto(req.body, ProductDTO, next);
    if (!validate) {
      return next(new Error("Invalid request"));
    }
    // find the product by id
    const product = await getProductViaId(Number(id));
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
    const details = await validateDto(product, ProductDTO, next);
    console.log(details);
    if (details) {
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
// delete a product
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await jwtVerification(req, next);
    if (!user) {
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>", user.id)
    const admin = await checkIfUserIsAdmin(user.id)
    if (!admin) {
      return res.status(400).json({ "message": "Only Admin can do this" })
    }
    const { id } = req.params;
    const product = await getProductViaId(Number(id));
    if (!product) {
      throw new ApiError(400, "Product not found");
    }
    const deleteProduct = await deleteProductFromDB(product.id);
    if (!deleteProduct) {
      throw new ApiError(400, "Product not deleted");
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};