import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../database/connection";
import { ApiResponse } from "../utility/ApiResponse";
import { User } from "../models/entities/User";
const userRepository = AppDataSource.getRepository(User);

export const alreadyExistOrNotEmailforRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const user = await userRepository.findOne({ where: { email } });
    console.log("In alreadyExistOrNotEmailforRegister ", user);
    if (user)  {
        return res.status(400).json(new ApiResponse(400, "Email already exist"));
    }
    next();
  } catch (error) {
    next(error);
  }
};
