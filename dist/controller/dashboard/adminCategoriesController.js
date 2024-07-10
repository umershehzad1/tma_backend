"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryController = exports.deleteCategoryController = exports.getAllCategoryController = exports.addCategoryController = void 0;
const catchAsyncErrors_1 = __importDefault(require("../../middleware/catchAsyncErrors"));
// import { uploadImageToAzure, deleteImageFromAzure } from '../../utils/azureStorage';
exports.addCategoryController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!req.file || !req.body.categoryName) {
    //   return next(new ErrorHandler("Please provide all the details of the category", 400));
    // }
    // const imageUrl = await uploadImageToAzure(req.file);
    // const category = new Category({
    //   category_name: req.body.categoryName,
    //   category_image: imageUrl,
    // });
    // await category.save();
    // return res.status(200).json({
    //   success: true,
    //   data: category,
    //   message: "Category added successfully"
    // });
}));
exports.getAllCategoryController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const categories = await Category.findAll();
    // if (!categories || categories.length === 0) {
    //   return next(new ErrorHandler("No categories found", 404));
    // }
    // return res.status(200).json({
    //   success: true,
    //   data: categories,
    // });
}));
exports.deleteCategoryController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id } = req.params;
    // const category = await Category.findByPk(id);
    // if (!category) {
    //   return next(new ErrorHandler("Category not found", 404));
    // }
    // await deleteImageFromAzure(category.category_image);
    // await category.destroy();
    // return res.status(200).json({
    //   success: true,
    //   data: category,
    //   message: "Category deleted successfully"
    // });
}));
exports.updateCategoryController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id } = req.params;
    // const { categoryName } = req.body;
    // const category = await Category.findByPk(id);
    // if (!category) {
    //   return next(new ErrorHandler("Category not found", 404));
    // }
    // if (categoryName) {
    //   category.category_name = categoryName;
    // }
    // if (req.file) {
    //   await deleteImageFromAzure(category.category_image);
    //   const imageUrl = await uploadImageToAzure(req.file);
    //   category.category_image = imageUrl;
    // }
    // await category.save();
    // return res.status(200).json({
    //   success: true,
    //   data: category,
    //   message: "Category updated successfully",
    // });
}));
