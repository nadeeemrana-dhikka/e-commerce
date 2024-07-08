import { Router,} from "express";
import { createUser, verifyEmailOtp, loginUser, sendOtpForResetPassword,sendOtpForRegistration } from "../controllers/user.controller";
import { upload, } from "../middlewares/multer.middleware";
const user = Router();
user.post("/signup/setp-1", sendOtpForRegistration);
user.post("/signup/setp-2", verifyEmailOtp);
user.post("/signup/setp-3",upload.single("profilePic"), createUser);
user.post("/loginUser",loginUser)
user.post("/resetPassword/step-1",sendOtpForResetPassword)
export default user;