



import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { Request } from 'express'; // Import Request type from Express

// Set The Storage Engine
const storage = multer.diskStorage({
  // destination
  destination: (req: Request, file, cb) => {
    const imagePath = `./public/assets/image/`;
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath, { recursive: true });
    }
    cb(null, imagePath);
  },
  // filename
  filename: function (req: Request, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    cb(null, `${uuid()}${extname}`);
  },
});

// Init Upload
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Set file size limit to 5MB
  fileFilter: function (req: Request, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

// Check File Type
function checkFileType(file: Express.Multer.File, cb: any) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  // Check extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Upload jpeg, jpg, png, or gif Only!");
  }
}