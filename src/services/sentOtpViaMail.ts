import { mailSender } from "./sendEmail";
import { otpDataInsert } from "../models/otpOperation";
import { Request, Response, NextFunction } from "express";
import { generateOtp } from "./genrateOtp";
import { emailDto } from "./userDto.services";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";

export async function sentOtpByMail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;
    const input = plainToInstance(emailDto, req.body);
    validate(input).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const errorMessages = errors
          .map((error: ValidationError) =>
            Object.values(error.constraints || {})
          )
          .flat();
        res.status(400).json({ message: errorMessages });
      } else {
        console.log(input);
      }
    });
    const otp = await generateOtp();
    console.log(otp);
    const mailResult = await mailSender(email, otp);
    const saveOTP = await otpDataInsert(req, res, otp);
    console.log("result is", saveOTP);
    res.status(200).send(saveOTP);
  } catch (error) {
    res.status(400).send(error);
  }
}
