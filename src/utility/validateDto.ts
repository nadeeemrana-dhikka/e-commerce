import { Request, Response, NextFunction } from "express"; // Importing types from express
import { ApiError } from "../utility/ApiError"; // Importing custom error handling class
import { plainToInstance } from "class-transformer"; // Importing plainToInstance from class-transformer
import { validate, ValidationError } from "class-validator"; // Importing validate and ValidationError from class-validator
import { ApiResponse } from "../utility/ApiResponse"; // Importing custom API response class
import {
    ProductDTO
} from "../services/products/products.Dto"; // Importing DTOs for user registration and password

export const validateDto = async (body:any,dto:any,next:NextFunction) => {
    try {
        // Validate input using class-validator
        const input = plainToInstance(dto, body); // Transforming plain object to class instance
        const validationErrors = await validate(input); // Validating the input
        if (validationErrors.length > 0) {
            const errorMessages = validationErrors
                .map((error: ValidationError) => Object.values(error.constraints || {}))
                .flat();
            return next({ message: errorMessages }); // Pass validation errors to the error handler
        }
        return 1;
    } catch (error) {
        next(error); // Handling any errors
    }
}