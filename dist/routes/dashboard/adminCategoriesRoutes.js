"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminCategoriesController_1 = require("../../controller/dashboard/adminCategoriesController");
const adminAuth_1 = require("../../middleware/dashboard/adminAuth");
const multer_1 = __importDefault(require("../../utils/multer"));
const router = express_1.default.Router();
router.post('/addCategory', adminAuth_1.adminAuthenticate, multer_1.default.single("image"), adminCategoriesController_1.addCategoryController);
router.get('/getAllCategories', adminAuth_1.adminAuthenticate, adminCategoriesController_1.getAllCategoryController);
router.delete('/deleteCategory/:id', adminAuth_1.adminAuthenticate, adminCategoriesController_1.deleteCategoryController);
router.put('/updateCategory/:id', adminAuth_1.adminAuthenticate, multer_1.default.single("image"), adminCategoriesController_1.updateCategoryController);
// router.post('/resetPassword', verifyUser, resetPassword);
exports.default = router;
