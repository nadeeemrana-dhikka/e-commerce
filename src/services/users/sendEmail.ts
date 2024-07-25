import { EMAIL_PASS, EMAIL_USER } from "../../models/database/secrets"; // Importing email credentials from secrets
const nodemailer = require("nodemailer"); // Importing nodemailer for sending emails

// Function to send an email with an OTP
export async function mailSender(email: string, subject: string, otp: string) {
  // Creating a transporter object using Gmail SMTP server
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail service
    secure: true, // Using SSL
    port: 465, // Port for secure SMTP
    auth: {
      user: EMAIL_USER, // Email user from secrets
      pass: EMAIL_PASS, // Email password from secrets
    }
  });

  // Defining the email options
  const mailOptions = {
    from: EMAIL_USER, // Sender's email address
    to: email, // Recipient's email address
    subject: subject, // Subject of the email
    text: `Dear User, \n
    To complete the process, please use the following One-Time Password (OTP): \n

Your OTP: ${otp} \n

Note: This OTP is valid for the next 15 minutes. If you did not request a ${subject}, please ignore this email or contact our support team immediately.\n

For any assistance, feel free to reach out to our support team at nadeem.ahasan@ashriyainfotech.co.in \n

Thank you, \n
Ashriya Infotech Support Team`, // Body of the email
  };

  // Sending the email
  const Check = transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error); // Log the error if sending fails
      return new Error("mail not sent"); // Return 0 if there was an error
    } else {
      console.log("Email sent: " + info.response); // Log the response if sending is successful
      return 1; // Return 1 if the email was sent successfully
    }
  });

  return 1; // Returning the result of the sendMail function
}
