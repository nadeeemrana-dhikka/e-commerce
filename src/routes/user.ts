import { Router,Request,Response } from 'express';
import { createUser, verifyEmailOtp } from '../controllers/user.controller'
import {sentOtpByMail } from '../services/sentOtpViaMail'
const user = Router();
user.post('/email',sentOtpByMail);
user.post('/verifyEmailOtp',verifyEmailOtp)
user.post("/create",createUser);
export default user;
