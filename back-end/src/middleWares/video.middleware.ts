// import multer from 'multer';
// import path from 'path';

// // Storage engine configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Define the folder where files should be stored
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// // File filter configuration
// const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//     if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

// // Multer upload middleware
// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 1073741824 // 1GB limit
//     }
// });

// export default upload;

import multer from 'multer';
import fs from 'fs';

export const pathName = `./public/assets/file/`;

if (!fs.existsSync(pathName)) {
  fs.mkdirSync(pathName, { recursive: true });
}

// Init Upload
export const uploadFile = multer({
  dest: pathName,
  limits: { fileSize: 1024 * 1024 * 1024 * 10 }, // 10GB limit
}).single("file");

