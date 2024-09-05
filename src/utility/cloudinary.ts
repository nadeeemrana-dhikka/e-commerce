import { v2 as cloudinary } from "cloudinary"; // Importing Cloudinary v2 SDK
import fs from "fs"; // Importing file system module

// Configuring Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath: any, originalname: any) => {
  // Override Cloudinary configuration for testing or specific use case
  cloudinary.config({
    cloud_name: "dreafrtnj",
    api_key: "233929814127848",
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (localFilePath.length <= 0) { // Check if localFilePath exists
      console.log("in cloudniary.ts file", localFilePath);
      return null; // Return null if localFilePath is empty or undefined
    }

    // Upload an image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      public_id: originalname, // Setting the public_id to the original file name
    });
    console.log("localFilePath",localFilePath)
   await fs.unlinkSync(localFilePath); // Delete the local file after successful upload
    return uploadResult; // Return the Cloudinary upload result
  } catch (error) {
  await fs.unlinkSync(localFilePath); // Delete the local file in case of error
    console.log(error); // Log the error to console
    throw error; // Throw the error to be handled by the calling function
  }
};

export { uploadOnCloudinary }; // Exporting the uploadOnCloudinary function for use in other modules
