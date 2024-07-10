import { Request, Response, NextFunction } from "express"; // Importing types from express
import { ApiError } from "../utility/ApiError"; // Importing custom error handling class
import { plainToInstance } from "class-transformer"; // Importing plainToInstance from class-transformer
import { validate, ValidationError } from "class-validator"; // Importing validate and ValidationError from class-validator
import { ApiResponse } from "../utility/ApiResponse"; // Importing custom API response class
import {
  userRegisterDto,
  passwordDto,
} from "../services/user/userDto.services"; // Importing DTOs for user registration and password
import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import { uploadOnCloudinary } from "../utility/cloudinary"; // Importing function to upload images to Cloudinary
import dotenv from "dotenv"; // Importing dotenv to load environment variables
dotenv.config({ path: ".env" }); // Loading environment variables from .env file
import {
  findUserByEmailInOtpTable,
  updateOtp,
  emailVerifiedInOtpTable,
  deleteOtp,
} from "../services/otp/otpDBOperation"; // Importing OTP related database operations
import {
  findOneUser,
  insertUserInDB,
  updatePassword,
  refreshTokenSaveInDB,
} from "../services/user/user.Operation"; // Importing user related database operations
import { jwtToken, jwtRefreshToken } from "../services/jwt.auth"; // Importing JWT token generation functions
import { sentOtpByMail } from "../services/email/sentOtpViaMail"; // Importing function to send OTP via email
export const sendOtpForRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body; // Extracting email from request body
    const user = await findOneUser(email); // Checking if user already exists
    if (user) {
      return next(new Error("User already exists")); // If user exists, send error
    }
    const subject = "Registration Request"; // Subject for OTP email
    await sentOtpByMail(req, res, subject); // Sending OTP via email
    res
      .status(200)
      .json(new ApiResponse(200, updateOtp, "User Registered Successfully")); // Sending success response
  } catch (error) {
    next(error); // Handling any errors
  }
};

export const verifyEmailOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body; // Extracting email and OTP from request body
    if ([email, otp].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All fields are required"); // Checking if any field is empty
    }
    const user = await findUserByEmailInOtpTable(email); // Finding user by email in OTP table
    if (!user) {
      throw new ApiError(400, "User not found"); // If user not found, send error
    }
    if (user.otp !== otp) {
      throw new ApiError(400, "Invalid OTP"); // If OTP does not match, send error
    }
    const now = new Date(); // Getting current date and time
    const time = now.getTime(); // Getting current time in milliseconds
    if (user.time < time) {
      return next(new Error("OTP Expired")); // If OTP has expired, send error
    }
    const updatedOtp = await updateOtp(email); // Updating OTP
    if (!updatedOtp) {
      throw new ApiError(400, "User not verified"); // If OTP update fails, send error
    }
    res
      .status(200)
      .json(new ApiResponse(200, updateOtp, "User Verified Successfully")); // Sending success response
  } catch (error) {
    next(error); // Handling any errors
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name, email, password, phone } = req.body; // Extracting user details from request body

    // Validate input using class-validator
    const input = plainToInstance(userRegisterDto, req.body); // Transforming plain object to class instance
    const validationErrors = await validate(input); // Validating the input
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .flat();
      return next({ message: errorMessages }); // Pass validation errors to the error handler
    }

    // Check if the user already exists
    const user = await findOneUser(email);
    if (user) {
      return next(new Error("User already exists")); // If user exists, send error
    }

    // Check if the email is verified
    const isVerified = await emailVerifiedInOtpTable(email);
    if (isVerified.length == 0) {
      return next(new Error("Email not verified")); // If email not verified, send error
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10); // Generating salt for hashing
    password = await bcrypt.hashSync(password, salt); // Hashing the password

    // Handle file upload
    const filePath = req.file?.path; // Getting file path from request
    const originalname = req.file?.filename; // Getting original file name from request
    const cloudinaryResponse = await uploadOnCloudinary(filePath, originalname); // Uploading file to Cloudinary
    if (!cloudinaryResponse) {
      return res
        .status(500)
        .json({ message: "Failed to upload image to Cloudinary" }); // If upload fails, send error
    }
    const profile = cloudinaryResponse.secure_url; // Getting secure URL of uploaded file

    // Insert the user into the database
    const saveUser = await insertUserInDB({
      name,
      email,
      password,
      phone,
      profile,
    });
    if (!saveUser) {
      return next(new Error("User not registered for some reasons")); // If user registration fails, send error
    }

    // Delete the OTP
    await deleteOtp(email); // Deleting OTP after successful registration

    // Send the success response
    res
      .status(201)
      .json(new ApiResponse(200, saveUser, "User Registered Successfully")); // Sending success response
  } catch (error) {
    next(error); // Handling any errors
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body; // Extracting email and password from request body
    if (!email && !password) {
      return next(new Error("email and password are required")); // Checking if email and password are provided
    }
    const user = await findOneUser(email); // Finding user by email
    if (!user) {
      return next(new Error("User not found")); // If user not found, send error
    }
    const isMatch = await bcrypt.compare(password, user.password); // Comparing provided password with stored password
    if (!isMatch) {
      return next(new Error("Password is incorrect")); // If password does not match, send error
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const token = await jwtToken(user); // Generating JWT token
    const refreshToken = await jwtRefreshToken(user.id); // Generating refresh token
    refreshTokenSaveInDB(email, refreshToken);

    res
      .status(200)
      .cookie("accessToken", token, options) // Setting access token as cookie
      .cookie("refreshToken", refreshToken, options) // Setting refresh token as cookie
      .json(
        new ApiResponse(
          200,
          {
            user: user.name,
            token,
            refreshToken,
          },
          "User logged In Successfully"
        )
      ); // Sending success response
  } catch (error) {
    next(error); // Handling any errors
  }
};

export const sendOtpForResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body; // Extracting email from request body
  try {
    // Check if the user already exists
    const user = await findOneUser(email); // Finding user by email
    if (!user) {
      return next(new Error("User not exists")); // If user not found, send error
    }
    const subject = "Password Reset Request"; // Subject for OTP email
    await sentOtpByMail(req, res, subject); // Sending OTP via email
  } catch (error) {
    next(error); // Handling any errors
  }
};

export const verifyOtpForResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otp, email, newPassword } = req.body; // Extracting OTP, email, and new password from request body
  try {
    if ([email, otp, newPassword].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All fields are required"); // Checking if any field is empty
    }
    // Check if the new password is strong or not
    const input = plainToInstance(passwordDto, req.body); // Transforming plain object to class instance
    const validationErrors = await validate(input); // Validating the input
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .flat();
      return next({ message: errorMessages }); // Pass validation errors to the error handler
    }

    // Check if user exists in OTP table
    const userInEmailTable = await findOneUser(email); // Finding user by email
    if (!userInEmailTable) {
      return next(new Error("User not exists")); // If user not found, send error
    }
    const user = await findUserByEmailInOtpTable(email); // Finding user by email in OTP table
    if (!user) {
      throw new ApiError(400, "User not found"); // If user not found, send error
    }
    // Check if OTP is valid or not
    if (user.otp !== otp) {
      throw new ApiError(400, "Invalid OTP"); // If OTP does not match, send error
    }
    const now = new Date(); // Getting current date and time
    const time = now.getTime(); // Getting current time in milliseconds
    if (user.time < time) {
      return next(new Error("OTP Expired")); // If OTP has expired, send error
    }
    const saltRounds = 10; // Setting salt rounds for hashing
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds); // Hashing the new password
    updatePassword(email, hashedPassword); // Updating the password in the database
    res.status(200).json({ message: "Password updated successfully" }); // Sending success response
  } catch (error) {
    next(error); // Handling any errors
  }
};