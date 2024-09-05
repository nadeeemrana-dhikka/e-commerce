import { Router } from "express"; // Importing Router from express
import {
  createUser,
  verifyEmailOtp,
  loginUser,
  sendOtpForResetPassword,
  sendOtpForRegistration,
  verifyOtpForResetPassword,
} from "../../controllers/users/user.controller"; // Importing controller functions
import { upload,  } from "../../middlewares/multer.middleware"; // Importing multer middleware for file uploads

const user = Router(); // Creating a new Router instance

// Route to send OTP for registration (Step 1)
user.post("/signup/step-1", sendOtpForRegistration);

// Route to verify email OTP (Step 2)
user.post("/signup/step-2", verifyEmailOtp);

// Route to create a new user (Step 3) with profile picture upload
user.post("/signup/step-3", upload.single("profilePic"), createUser);
// Route to log in a user
user.post("/loginUser", loginUser);

// Route to send OTP for password reset (Step 1)
user.post("/resetPassword/step-1", sendOtpForResetPassword);

// Route to verify OTP for password reset and update password (Step 2)
user.post("/resetPassword/step-2", verifyOtpForResetPassword);

export default user; // Exporting the router
