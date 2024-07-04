import { Request, Response, NextFunction } from "express";
import { User } from "./entities/User";
import { Otp } from "./entities/Otp";
import { AppDataSource } from "../database/connection";
const userRepository = AppDataSource.getRepository(User);
const otpRepository = AppDataSource.getRepository(Otp);
export async function otpDataInsert(req: Request, res: Response, otp: string) {
    try {
      const { email } = req.body;
  
      const now = new Date();
      const time = now.getTime()+ (30 * 60 * 1000);
      
      const otpObj = new Otp();
      const user = await otpRepository.find({ where: { email } });
      var saveOTP;
      if (user.length > 0) {
          saveOTP    = await otpRepository.update({ email }, { otp, time });
      }
      else{
          otpObj.email = email;
      otpObj.otp = otp;
      otpObj.time = time;
       saveOTP = await otpRepository.save(otpObj);
      }
      return saveOTP;
    } catch (error) {
      res.status(500).send(error);
    }
  }