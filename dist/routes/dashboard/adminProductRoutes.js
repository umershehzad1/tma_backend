"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuth_1 = require("../../middleware/dashboard/adminAuth");
const multipleUploadMulter_1 = __importDefault(require("../../utils/multipleUploadMulter"));
const adminProductController_1 = require("../../controller/dashboard/adminProductController");
const router = express_1.default.Router();
router.post('/addProduct', adminAuth_1.adminAuthenticate, multipleUploadMulter_1.default.array("images", 5), adminProductController_1.addProductController);
router.get('/getAllProducts', adminAuth_1.adminAuthenticate, adminProductController_1.getAllProductController);
router.delete('/deleteProduct/:id', adminAuth_1.adminAuthenticate, adminProductController_1.deleteProductController);
router.put('/updateProduct/:id', adminAuth_1.adminAuthenticate, multipleUploadMulter_1.default.array("images", 5), adminProductController_1.updateProductController);
exports.default = router;
