import { Request, Response, NextFunction } from "express";
import { Otp } from "../../models/entities/Otp";
import { AppDataSource } from "../../models/database/connection";
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


  export async function findUserByEmailInOtpTable(email:string) {
     const user = await otpRepository.findOne({ where: { email } });
     return user;
  }

  export async function updateOtp(email:string) {
    return await otpRepository.update(
      { email },
      { isVerified: true }
    );
 }  

 export async function  emailVerifiedInOtpTable(email:string){
  return await otpRepository.find({
    where: {
      email: email,
      isVerified: true,
    },
  })
 }



 export async function deleteOtp(email:string) {
  return await otpRepository.delete({ email });
}  
