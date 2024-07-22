import { mailSender } from "./sendEmail"; // Importing mailSender function from sendEmail module
import { otpDataInsert } from "./otp.service"; // Importing otpDataInsert function from otpDBOperation module
import { Request, Response } from "express"; // Importing Request and Response types from express
import { generateOtp } from "./genrateOtp"; // Importing generateOtp function from genrateOtp module
import { emailDto } from "./userDto.service"; // Importing emailDto from userDto.services module
import { validate, ValidationError } from "class-validator"; // Importing validate and ValidationError from class-validator
import { plainToInstance } from "class-transformer"; // Importing plainToInstance from class-transformer

// Function to send OTP by email
export async function sentOtpByMail(
  req: Request, // Request object
  res: Response, // Response object
  subject: string // Email subject
) {
  try {
    const { email } = req.body; // Extracting email from request body
    const input = plainToInstance(emailDto, req.body); // Transforming plain object to class instance for validation
    validate(input).then((errors: ValidationError[]) => { // Validating the input
      if (errors.length > 0) {
        const errorMessages = errors
          .map((error: ValidationError) =>
            Object.values(error.constraints || {})
          )
          .flat(); // Flattening the error messages array
        res.status(400).json({ message: errorMessages }); // Sending validation error messages as response
      } else {
        console.log(input); // Logging the validated input
      }
    });
    const otp = await generateOtp(); // Generating an OTP
    console.log(otp); // Logging the generated OTP
    const mailTest = await mailSender(email, subject, otp); // Sending OTP via email
    if (!mailTest) {
      throw new Error("Mail not sent, something went wrong"); // Throwing error if email sending fails
    }
    const saveOTP = await otpDataInsert(req, res, otp); // Saving the OTP data
    res.status(200).send(saveOTP); // Sending success response with saved OTP data
  } catch (error) {
    res.status(400).send(error); // Sending error response
  }
}
