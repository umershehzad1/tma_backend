const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    cb(new Error("File type is not supported"), false);
    return;
  }
  cb(null, true);
};

const multipleUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = multipleUpload;
