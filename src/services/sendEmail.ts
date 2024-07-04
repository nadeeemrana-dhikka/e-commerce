import test from "node:test";

const nodemailer = require("nodemailer");
export async function mailSender(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
      user: "nadeema.aipl@gmail.com",
      pass: "inth rwer pynk bhtl",
    }
  });

  const mailOptions = {
    from: "nadeema.aipl@gmail.com",
    to: email,
    subject: "Password Reset Request ",
    text: `Dear User, \n
    We have received a request to reset your password. To complete the process, please use the following One-Time Password (OTP): \n

Your OTP: ${otp} \n

Please enter this OTP on the password reset page to proceed with changing your password.\n

Note: This OTP is valid for the next 15 minutes. If you did not request a password reset, please ignore this email or contact our support team immediately.\n

For any assistance, feel free to reach out to our support team at nadeem.ahasan@ashriyainfotech.co.in \n

Thank you, \n
Ashriya infotech Support  Team`,
  };

  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
      return 0
    } else {
      console.log("Email sent: " + info.response);
      return 1;
    }
  });
}


// inth rwer pynk bhtl