import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, "./public/temp"); // Directory to save files
    },
    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        const extension = path.extname(file.originalname); // File extension
        const timestamp = Date.now(); // Unique timestamp
        const newFileName = `${path.basename(file.originalname, extension)}-${timestamp}${extension}`; // New filename
        cb(null, newFileName); // Provide the new filename
    }
});

// File filter to accept only image files
const imageFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(null, false); // Reject the file
        req.body.fileValidationError = "Only image files are allowed!"; // Set error message
    }
};

// Create multer instance with storage and file filter
const upload = multer({ 
    storage, 
    fileFilter: imageFileFilter 
});

// Middleware to handle file upload and check if a file is present
const handleFileUpload = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        // No file was uploaded, continue to the controller
        return next();
    }

    // If a file is present, proceed with file handling
    next();
};


export { upload, handleFileUpload };