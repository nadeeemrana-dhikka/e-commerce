import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utility/ApiError";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { ApiResponse } from "../utility/ApiResponse";
import { userRegisterDto } from "../services/user/userDto.services";
import bcrypt from "bcryptjs";
import { uploadOnCloudinary } from "../utility/cloudinary";
import dotenv from 'dotenv'
dotenv.config({path: '.env'})
import {findUserByEmailInOtpTable, updateOtp, emailVerifiedInOtpTable, deleteOtp} from '../services/otp/otpDBOperation'
import { findOneUser, insertUserInDB } from '../services/user/user.Operation'
import { jwtToken,jwtRefreshToken } from '../services/jwt.auth'
import { sentOtpByMail } from '../services/email/sentOtpViaMail'

export const sendOtpForRegistration = async (req: Request,
  res: Response,
  next:NextFunction) =>{
    try {
      const { email } = req.body;
      const user = await findOneUser(email);
    if (user) {
      return next(new Error("User already exists"));
    }
    const subject = "Registration Request"
    await sentOtpByMail(req,res,subject)
   res
   .status(200)
   .json(new ApiResponse(200, updateOtp, "User Registered Successfuly"));
    } catch (error) {
      
    }
  }



export const verifyEmailOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp } = req.body;
    if ([email, otp].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All field are required");
    }
    const user = await findUserByEmailInOtpTable(email);
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    if (user.otp !== otp) {
      throw new ApiError(400, "Invalid OTP");
    }
    const now = new Date();
    // Get the current time in milliseconds since January 1, 1970
    const time = now.getTime();
    if (user.time < time) {
      return next(new Error("OTP Expired"));
    }
    const updatedOtp = await updateOtp(email)
    if (!updateOtp) {
      throw new ApiError(400, "User not verified");
    }
    res
      .status(200)
      .json(new ApiResponse(200, updateOtp, "User Registered Successfuly"));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, email, password, phone } = req.body;

    // Validate input using class-validator
    const input = plainToInstance(userRegisterDto, req.body);
    const validationErrors = await validate(input);
    if (validationErrors.length > 0) {
      const errorMessages = validationErrors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .flat();
      return next({ message: errorMessages }); // Pass validation errors to the error handler
    }

    // Check if the user already exists
    const user = await findOneUser(email);
    if (user) {
      return next(new Error("User already exists"));
    }

    // Check if the email is verified
    const isVerified = await emailVerifiedInOtpTable(email);
    if (isVerified.length == 0) {
      return next(new Error("Email not verified"));
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10); // 10 is the number of salt rounds
    password = await bcrypt.hashSync(password, salt);

    // Handle file upload
    const filePath = req.file?.path;
    const originalname = req.file?.filename;
    const cloudinaryResponse = await uploadOnCloudinary(filePath, originalname);
    if (!cloudinaryResponse) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
    }
    const profile = cloudinaryResponse.secure_url;

    // Insert the user into the database
    const saveUser = await insertUserInDB({
      name,
      email,
      password,
      phone,
      profile,
    });
    if (!saveUser) {
      return next(new Error("User not registered for some reasons"));
    }

    // Delete the OTP
    await deleteOtp(email);

    // Send the success response
    res.status(201).json(new ApiResponse(200, saveUser, "User Registered Successfully"));
  } catch (error) {
    next(error); // Pass any other errors to the error handler
  }
}; 

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return next(new Error("email password is required"));
    }
    const user = await findOneUser(email);
    if (!user) {
      return next(new Error("user not found"));
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return next(new Error("password is incorrect"));
          }
          const options = {
            httpOnly: true,
            secure: true
        }
          const token = await jwtToken(user);
          const  refreshToken = await jwtRefreshToken(user.id);
          console.log(token,refreshToken)
              res.status(200)
              .cookie("accessToken",  token
              , options)
              .cookie("refreshToken", refreshToken, options)
              .json(
                  new ApiResponse(
                      200,
                      {
                          user: user.name, token, refreshToken
                      },
                      "User logged In Successfully"
                  )
              )
  } catch (error) {
    next(error);
  }
};

export const sendOtpForResetPassword = async (req: Request, res: Response, next: NextFunction) =>{
  const { email } = req.body
  try {
     // Check if the user already exists
     const user = await findOneUser(email);
     if (!user) {
       return next(new Error("User not exists"));
     }
     const subject = "Password Reset Request "
    await sentOtpByMail(req,res,subject);
  } catch (error) {
    next(error)
  }
}


