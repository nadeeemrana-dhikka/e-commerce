import { mailSender } from "./sendEmail";
import { otpDataInsert } from "../otp/otpDBOperation";
import { Request, Response, NextFunction } from "express";
import { generateOtp } from "../otp/genrateOtp";
import { emailDto } from "../user/userDto.services";
import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import { Subject } from "typeorm/persistence/Subject";

export async function sentOtpByMail(
  req: Request,
  res: Response,subject:string) {
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
  const mailTest =   await mailSender(email,subject, otp) ;
  if (!mailTest) {
    new Error("mail not send something wrong")
  }
    const saveOTP = await otpDataInsert(req, res, otp);
    res.status(200).send(saveOTP);
  } catch (error) {
    res.status(400).send(error);
  }
}
