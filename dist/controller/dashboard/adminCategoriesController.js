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
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
const models_1 = __importDefault(require("../../db/models/"));
const addCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file || !req.body.categoryName) {
            return res.status(400).json({ msg: "Please provide all the details of category" });
        }
        const result = yield cloudinary_1.default.uploader.upload(req.file.path);
        let category = new models_1.default({
            category_name: req.body.categoryName,
            category_image: result.secure_url,
            cloudinary_id: result.public_id,
        });
        yield category.save();
        res.status(200).json({
            success: true,
            data: category,
            message: "Category added successfully"
        });
    }
    catch (err) {
        console.log({ error: err.message });
        res.status(500).json({ error: err.message });
    }
});
exports.addCategoryController = addCategoryController;
const getAllCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield models_1.default.findAll();
        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json({
            success: true,
            data: categories,
        });
    }
    catch (err) {
        console.log({ error: err.message });
        res.status(500).json({ error: err.message });
    }
});
exports.getAllCategoryController = getAllCategoryController;
const deleteCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const category = yield models_1.default.findByPk(id);
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }
        yield cloudinary_1.default.uploader.destroy(category.cloudinary_id);
        yield category.destroy();
        res.status(200).json({
            success: true,
            data: category,
            message: "Category deleted successfully"
        });
    }
    catch (err) {
        console.log({ error: err.message });
        res.status(500).json({ error: err.message });
    }
});
exports.deleteCategoryController = deleteCategoryController;
const updateCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const categoryName = req.body.categoryName;
        const category = yield models_1.default.findByPk(id);
        if (!category) {
            return res.status(404).json({ msg: "Category not found" });
        }
        if (categoryName) {
            category.category_name = categoryName;
        }
        if (req.file) {
            yield cloudinary_1.default.uploader.destroy(category.cloudinary_id);
            const result = yield cloudinary_1.default.uploader.upload(req.file.path);
            category.category_image = result.secure_url;
            category.cloudinary_id = result.public_id;
        }
        yield category.save();
        res.status(200).json({
            success: true,
            data: category,
            message: "Category updated successfully",
        });
    }
    catch (err) {
        console.log({ error: err.message });
        res.status(500).json({ error: err.message });
    }
});
exports.updateCategoryController = updateCategoryController;
