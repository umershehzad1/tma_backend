import { Request } from 'express';
import multer, { FileFilterCallback, StorageEngine } from 'multer';
import path from 'path';

// Multer config
const storage: StorageEngine = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    cb(null, false);
    return;
  }
  cb(null, true);
};

const multipleUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default multipleUpload;
