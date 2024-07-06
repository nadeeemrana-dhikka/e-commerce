// cloudinary.ts

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: any, originalname: any) => {
  // Configuration
  cloudinary.config({
    cloud_name: "dreafrtnj",
    api_key: "233929814127848",
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    if (localFilePath.length <= 0) {
      console.log("in cloudniary.ts file", localFilePath);
      return null;
    }
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      public_id: originalname,
    });
    fs.unlinkSync(localFilePath);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(error);
    throw error;
  }
};
export { uploadOnCloudinary };
