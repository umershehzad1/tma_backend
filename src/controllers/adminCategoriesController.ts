import { NextFunction, Request, Response } from "express";
import Category from "../models/Category";
import { catchError } from "../util/handleError";
import ErrorHandler from "../util/errorHandler";
import { uploadImageToAzure, deleteImageFromAzure } from "../util/azureStorage";

/*
  METHOD : POST
  PATH : http://localhost:4000/api/v1/admin/categories/addCategory
*/
export const addCategoryController = catchError(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file || !req.body.categoryName) {
    return next(new ErrorHandler("Please provide all the details of the category", 400));
  }
  const imageUrl = await uploadImageToAzure(req.file);
  const category = new Category({
    category_name: req.body.categoryName,
    category_image: imageUrl,
  });
  await category.save();
  return res.status(200).json({
    success: true,
    data: category,
    message: "Category added successfully"
  });
});
/*
  METHOD : GET
  PATH : http://localhost:4000/api/v1/admin/categories/getAllCategories
*/
export const getAllCategoryController = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const categories = await Category.findAll();
  if (!categories || categories.length === 0) {
    return next(new ErrorHandler("No categories found", 404));
  }
  return res.status(200).json({
    success: true,
    data: categories,
  });
});
/*
  METHOD : DELETE 
  PATH : http://localhost:4000/api/v1/admin/categories/deleteCategory/:id
*/
export const deleteCategoryController = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const category = await Category.findByPk(id);
  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }
  await deleteImageFromAzure(category.category_image);
  await category.destroy();
  return res.status(200).json({
    success: true,
    data: category,
    message: "Category deleted successfully"
  });
});
/*
  METHOD : PUT 
  PATH : http://localhost:4000/api/v1/admin/categories/updateCategory/:id
*/

export const updateCategoryController = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  const category = await Category.findByPk(id);
  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }
  if (categoryName) {
    category.category_name = categoryName;
  }
  if (req.file) {
    await deleteImageFromAzure(category.category_image);
    const imageUrl = await uploadImageToAzure(req.file);
    category.category_image = imageUrl;
  }
  await category.save();
  return res.status(200).json({
    success: true,
    data: category,
    message: "Category updated successfully",
  });
});
