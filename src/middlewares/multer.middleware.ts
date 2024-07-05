
  import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp");
    },


    // filename: function (req, file, cb) {
    //   cb(null, file.originalname);
    // }
    filename: function (req, file, cb) {
      // Extract the file extension
      const extension = path.extname(file.originalname);
      // Create a new file name with the timestamp
      const timestamp = Date.now();
      const newFileName = `${path.basename(file.originalname, extension)}-${timestamp}${extension}`;
      cb(null, newFileName);
    }
});

export const upload = multer({ storage });
