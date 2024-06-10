import multer from "multer";
import path from "node:path";
const destinationPath = path.join(__dirname, "../../../data");
const upload = multer({
	storage: multer.diskStorage({
		destination(_req, _file, cb) {
			cb(null, destinationPath);
		},
		filename(_req, file, cb) {
			cb(null, `${new Date().getTime()}_${file.originalname}`);
		},
	}),
	fileFilter: (_req, file, cb) => {
		if (!file.originalname.match(/\.(jpeg|JPEG|jpg|JPG|png|PNG|svg|SVG)$/)) {
			// Return an error and reject the file upload
			return cb(null, false);
		}
		// Continue with the file upload process
		cb(null, true);
	},
});
export default upload;
