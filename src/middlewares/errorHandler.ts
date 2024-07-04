// errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utility/ApiError'; // Assuming you have a custom ApiError class

// Middleware function to handle errors
const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  // Set the status code from the error or default to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Set the response status code
  res.status(statusCode);

  // Send the error response in JSON format
  res.json({
    success: false,
    message: err.message || 'Internal Server Error',
    statusCode,
    errors: err.errors || [],
  });

  // Optionally log the error
  console.error(err);
  res.end();
};

export default errorHandler;
