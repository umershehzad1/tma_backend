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
exports.updateProductController = exports.deleteProductController = exports.getAllProductController = exports.addProductController = void 0;
const catchAsyncErrors_1 = __importDefault(require("../../middleware/catchAsyncErrors"));
// import { uploadImageToAzure, deleteImageFromAzure} from "../../utils/azureStorage";
/*
  METHOD : POST
  PATH : http://localhost:4000/api/admin/product/addProduct
*/
exports.addProductController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const {
    //   productName,
    //   rating,
    //   description,
    //   discount_date,
    //   price,
    //   size,
    //   discount,
    //   is_featured,
    //   tags,
    //   total_orders,
    //   category_id,
    //   is_top_selling,
    //   is_limited_stock,
    //   is_TMA_delivered,
    // } = req.body;
    // const categoryCredentials = await Category.findByPk(category_id);
    // if (!categoryCredentials) {
    //   return next(new ErrorHandler("Category not found", 404));
    // }
    // const imageUrls = [];
    // if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    //   for (const file of req.files as Express.Multer.File[]) {
    //     const imageUrl = await uploadImageToAzure(file);
    //     imageUrls.push(imageUrl);
    //   }
    // }
    // const product = await Product.create({
    //   product_name: productName,
    //   category_name: categoryCredentials.category_name,
    //   rating: rating,
    //   description: description,
    //   feature_image: JSON.stringify(imageUrls), // Store as JSON string
    //   discount_date: discount_date,
    //   price: price,
    //   size: size,
    //   discount: discount,
    //   is_featured: is_featured,
    //   tags: tags,
    //   total_orders: total_orders,
    //   category_id: category_id,
    //   is_top_selling: is_top_selling,
    //   is_limited_stock: is_limited_stock,
    //   is_TMA_delivered: is_TMA_delivered,
    // });
    // return res.status(200).json({
    //   success: true,
    //   data: product,
    //   message: "Product added successfully",
    // });
}));
/*
  METHOD : GET
  PATH : http://localhost:4000/api/admin/product/getAllProducts
*/
exports.getAllProductController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const products = await Product.findAll();
    // if (!products || products.length === 0) {
    //   return next(new ErrorHandler("No products found", 404));
    // }
    // products.forEach((product: any) => {
    //   product.feature_image = JSON.parse(product.feature_image);
    // });
    // return res.status(200).json({
    //   success: true,
    //   data: products,
    // });
}));
/*
  METHOD : DELETE
  PATH : http://localhost:4000/api/admin/product/deleteProduct/id
*/
exports.deleteProductController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = req.params.id;
    // const product = await Product.findByPk(id);
    // if (!product) {
    //   return next(new ErrorHandler("Product not found", 404));
    // }
    // const imageUrls = JSON.parse(product.feature_image);
    // for (const url of imageUrls) {
    //   await deleteImageFromAzure(url);
    // }
    // await product.destroy();
    // return res.status(200).json({
    //   success: true,
    //   data: product,
    //   message: "Product deleted successfully",
    // });
}));
/*
  METHOD : PUT
  PATH : http://localhost:4000/api/admin/product/updateProduct/id
*/
exports.updateProductController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id } = req.params;
    // const {
    //   productName,
    //   rating,
    //   description,
    //   discount_date,
    //   price,
    //   size,
    //   discount,
    //   is_featured,
    //   tags,
    //   total_orders,
    //   category_id,
    //   is_top_selling,
    //   is_limited_stock,
    //   is_TMA_delivered,
    // } = req.body;
    // const product = await Product.findByPk(id);
    // if (!product) {
    //   return next(new ErrorHandler("Product not found", 404));
    // }
    // const categoryCredentials = await Category.findByPk(category_id);
    // if (!categoryCredentials) {
    //   return next(new ErrorHandler("Category not found", 404));
    // }
    // product.product_name = productName || product.product_name;
    // product.category_name = categoryCredentials.category_name || product.category_name;
    // product.rating = rating || product.rating;
    // product.description = description || product.description;
    // product.discount_date = discount_date || product.discount_date;
    // product.price = price || product.price;
    // product.size = size || product.size;
    // product.discount = discount || product.discount;
    // product.is_featured = is_featured !== undefined ? is_featured : product.is_featured;
    // product.tags = tags || product.tags;
    // product.total_orders = total_orders || product.total_orders;
    // product.category_id = category_id || product.category_id;
    // product.is_top_selling = is_top_selling !== undefined ? is_top_selling : product.is_top_selling;
    // product.is_limited_stock = is_limited_stock !== undefined ? is_limited_stock : product.is_limited_stock;
    // product.is_TMA_delivered = is_TMA_delivered !== undefined ? is_TMA_delivered : product.is_TMA_delivered;
    // if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    //   const existingImages = JSON.parse(product.feature_image);
    //   for (const url of existingImages) {
    //     await deleteImageFromAzure(url);
    //   }
    //   const newImageUrls = [];
    //   for (const file of req.files as Express.Multer.File[]) {
    //     const imageUrl = await uploadImageToAzure(file);
    //     newImageUrls.push(imageUrl);
    //   }
    //   product.feature_image = JSON.stringify(newImageUrls); // Update with new images
    // }
    // await product.save();
    // return res.status(200).json({
    //   success: true,
    //   data: product,
    //   message: "Product updated successfully",
    // });
}));
