import { Request, Response } from "express"; // Importing Request and Response types from express
import { Otp } from "../../models/entities/user/otp.entity"; // Importing the Otp entity
import { AppDataSource } from "../../models/database/connection"; // Importing the data source for database connection

const otpRepository = AppDataSource.getRepository(Otp); // Getting the repository for the Otp entity

// Function to insert or update OTP data in the database
export async function otpDataInsert(req: Request, res: Response, otp: string) {
  try {
    const { email } = req.body; // Extracting email from request body

    const now = new Date(); // Current date and time
    const time = now.getTime() + (30 * 60 * 1000); // Setting expiry time for OTP (30 minutes from now)

    const otpObj = new Otp(); // Creating a new instance of Otp entity
    const user = await otpRepository.find({ where: { email } }); // Finding if OTP data already exists for the email

    var saveOTP;
    if (user.length > 0) { // If OTP data exists for the email, update it
      saveOTP = await otpRepository.update({ email }, { otp, time });
      console.log("otp updated");
    } else { // If OTP data doesn't exist, create a new OTP object and save it
      otpObj.email = email;
      otpObj.otp = otp;
      otpObj.time = time;
      saveOTP = await otpRepository.save(otpObj);
      console.log("otp saved");
    }

    return saveOTP; // Returning the saved or updated OTP data
  } catch (error) {
    console.log(error);
    res.status(500).send(error); // Sending 500 status and error message if an error occurs
  }
}

// Function to find a user by email in the OTP table
export async function findUserByEmailInOtpTable(email: string) {
  const user = await otpRepository.findOne({ where: { email } }); // Finding a user by email in the OTP table
  return user; // Returning the found user object
}

// Function to update OTP verification status
export async function updateOtp(email: string) {
  return await otpRepository.update(
    { email },
    { isVerified: true } // Updating isVerified field to true for the given email
  );
}

// Function to check if email is verified in the OTP table
export async function emailVerifiedInOtpTable(email: string) {
  return await otpRepository.find({
    where: {
      email: email,
      isVerified: true, // Checking if email is verified (isVerified field is true)
    },
  });
}

// Function to delete OTP data by email
export async function deleteOtp(email: string) {
  return await otpRepository.delete({ email }); // Deleting OTP data for the given email
}
