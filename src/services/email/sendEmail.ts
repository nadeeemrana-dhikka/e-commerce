import { EMAIL_PASS,EMAIL_USER } from "../../models/database/secrets";
const nodemailer = require("nodemailer");
export async function mailSender(email: string,subject:string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    }
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: email,
    subject: subject,
    text: `Dear User, \n
    Complete the process, please use the following One-Time Password (OTP): \n

Your OTP: ${otp} \n


Note: This OTP is valid for the next 15 minutes. If you did not request a password reset, please ignore this email or contact our support team immediately.\n

For any assistance, feel free to reach out to our support team at nadeem.ahasan@ashriyainfotech.co.in \n

Thank you, \n
Ashriya infotech Support  Team`,
  };

 const Check = transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
      return 0
    } else {
      console.log("Email sent: " + info.response);
      return 1;
    }
  });
  return Check;
}


// inth rwer pynk bhtl