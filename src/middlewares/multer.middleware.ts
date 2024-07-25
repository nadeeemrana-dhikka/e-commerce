import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// Set up storage configuration for multer
const storage = multer.diskStorage({
    // Define the destination for uploaded files
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        // Save files in the './public/temp' directory
        cb(null, "./public/temp");
    },
    // Define the filename for uploaded files
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        // Get the file extension (e.g., .jpg, .png)
        const extension = path.extname(file.originalname);
        // Generate a unique timestamp
        const timestamp = Date.now();
        // Construct the new filename using the original name (without extension) and the timestamp
        const newFileName = `${path.basename(file.originalname, extension)}-${timestamp}${extension}`;
        // Pass the new filename to the callback
        cb(null, newFileName);
    }
});

// File filter to accept only image files
const imageFileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // Allowed MIME types for image files
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    
    // Check if the file's MIME type is in the allowed list
    if (allowedMimeTypes.includes(file.mimetype)) {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file without an error message
        cb(null, false);
        // Optionally, you can set an error in the request object to handle it later
        req.body.fileValidationError = "Only image files are allowed!";
        
    }
};

// Create and export the upload middleware with the specified storage configuration and file filter
export const upload = multer({ 
    storage,          // Use the defined storage configuration
    fileFilter: imageFileFilter // Use the image file filter
});
