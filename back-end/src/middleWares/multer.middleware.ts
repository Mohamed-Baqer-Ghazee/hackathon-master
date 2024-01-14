import multer from 'multer'; 
import fs from 'fs';
import { RequestHandler } from 'express';

export const pathName: string = `./public/assets/file/`;  
if (!fs.existsSync(pathName)) {
  fs.mkdirSync(pathName, { recursive: true });
}

// Init Upload
export const uploadFile: RequestHandler = multer({
  dest: pathName,
  limits: { fileSize: 1024 * 1024 * 1024 * 10 } // 10GB limit
}).single("file");
