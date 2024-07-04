import { mailSender } from './sendEmail';
import { otpDataInsert } from '../models/otpOperation';
import { Request, Response, NextFunction} from 'express';
import { generateOtp } from './genrateOtp';
export async function sentOtpByMail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;
      const otp = await generateOtp();
      console.log(otp);
      const mailResult = await mailSender( email, otp);
      const saveOTP = await otpDataInsert(req, res, otp);
      console.log("result is", saveOTP);
      res.status(200).send(saveOTP);
    } catch (error) {
      res.status(400).send(error);
    }
  }