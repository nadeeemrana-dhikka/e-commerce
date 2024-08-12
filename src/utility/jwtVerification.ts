import { NextFunction } from "express";
import { JWT_SECRET } from "../models/database/secrets";
import jwt, { JwtPayload } from "jsonwebtoken";

// Middleware function to verify JWT
export const jwtVerification = async (req: any, next: NextFunction) => {
  try {
  const authHeader = req.headers?.authorization; // Get the Authorization header
  let token;
  if (authHeader) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]; // Extract the token part
      console.log("Token:", token);
    }
  } else {
    return next(new Error("JWT_SECRET not found")); // Error if JWT_SECRET is missing
  }

  if (!JWT_SECRET) {
    return next(new Error("JWT_SECRET not found")); // Error if JWT_SECRET is not defined
  }

    // Verify the token and specify the algorithm
    const decodedToken = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    if (!decodedToken) {
      return next(new Error("Invalid token")); // Error if token is invalid
    }

    const user = await jwt.decode(token); // Decode the token to get user information
    if (!user || typeof user === "string") {
      return next(new Error("User not found")); // Error if user is not found
    }

    return user; // Return the decoded user object

  } catch (error) {
    return next(error); // Return the actual error message
  }
};
