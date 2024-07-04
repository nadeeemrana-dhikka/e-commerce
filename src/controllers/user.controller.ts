import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utility/ApiError";
import { AppDataSource } from "../database/connection";
import { User } from "../models/entities/User";
import { Otp } from "../models/entities/Otp";

import { ApiResponse } from "../utility/ApiResponse";
import { sentOtpByMail } from "../services/sentOtpViaMail";
const userRepository = AppDataSource.getRepository(User);
const otpRepository = AppDataSource.getRepository(Otp);

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, phone } = req.body;
    if ([name, email, password, phone].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All field are required");
    }
    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      throw new ApiError(400, "User already exists");
    }
    const newUser = userRepository.create({ name, email, password, phone });
    const saveUser = await userRepository.save(newUser);
    if (!saveUser) {
      throw new ApiError(400, "user not register");
    }
    res
      .status(201)
      .json(new ApiResponse(200, saveUser, "User Registered Successfuly"));
  } catch (error) {
    throw new ApiError(400, "user not register");
  }
};

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
    const user = await otpRepository.findOne({ where: { email } });
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    if (user.otp !== otp) {
      throw new ApiError(400, "Invalid OTP");
    }
    const updateOtp = await otpRepository.update(
      { email },
      { isVerified: true }
    );
    if (!updateOtp) {
      throw new ApiError(400, "User not verified");
    }
    res
      .status(200)
      .json(new ApiResponse(200, updateOtp, "User Registered Successfuly"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "User not verifie something wrong");
  }
};
