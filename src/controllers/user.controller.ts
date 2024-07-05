import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utility/ApiError";
import { plainToInstance } from "class-transformer";
import { AppDataSource } from "../database/connection";
import { User } from "../models/entities/User";
import { Otp } from "../models/entities/Otp";
import { validate, ValidationError } from "class-validator";
import { ApiResponse } from "../utility/ApiResponse";
import { userRegisterDto } from "../services/userDto.services";
import bcrypt from "bcryptjs";
import { uploadOnCloudinary } from "../utility/cloudinary";
const userRepository = AppDataSource.getRepository(User);
const otpRepository = AppDataSource.getRepository(Otp);

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
    const now = new Date();
    // Get the current time in milliseconds since January 1, 1970
    const time = now.getTime();
    if (user.time < time) {
      return next(new Error("OTP Expired"));
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
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { name, email, password, phone ,profilePic} = req.body;
    
    const input = plainToInstance(userRegisterDto, req.body);
    validate(input).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const errorMessages = errors
          .map((error: ValidationError) =>
            Object.values(error.constraints || {})
          )
          .flat();
       return res.status(400).json({ message: errorMessages });
        // return next(new Error({ message: errorMessages }));

      } else {
        console.log(input);
      }
    });
    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      return next(new Error("User already exists"));
    }
    const isVerified = await otpRepository.find({
      where: {
        email: email,
        isVerified: true,
      },
    });
    if (isVerified.length == 0) {
      return next(new Error("email not verify"));
    }
    // const newUser = new User()
    const salt = bcrypt.genSaltSync(10); // 10 is the number of salt rounds
    password = await bcrypt.hashSync(password, salt);
// file upload word start 
  // const filePath = req.file?.path;
  // const cloudinaryResponse = await uploadOnCloudinary(filePath);

  // if (!cloudinaryResponse) {
  //   return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
  // }
  // const profile = cloudinaryResponse.secure_url;
console.log(req.file?.path)
// end
const profile = ""
    const newUser = userRepository.create({ name, email, password, phone,profile});
    const saveUser = await userRepository.save(newUser);
    if (!saveUser) {
      return next(new Error("user not register for some reasons"));
    }
    await otpRepository.delete({ email });
    res
      .status(201)
      .json(new ApiResponse(200, saveUser, "User Registered Successfuly"));
  } catch (error) {
    next(error);
  }
};
