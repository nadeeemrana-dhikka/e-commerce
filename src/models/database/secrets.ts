import dotenv from "dotenv";

dotenv.config({ path: ".env" });
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const EMAIL_USER = process.env.EMAIL_USER;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const TOKEN_EXPIRE = process.env.TOKEN_EXPIRE;
export const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE;
