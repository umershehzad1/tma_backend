import { Request, Response } from 'express';
import cloudinary from '../../utils/cloudinary';
import upload from '../../utils/multer';
import  Category  from '../../db/models/';

export const addCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file || !req.body.categoryName) {
      return res.status(400).json({ msg: "Please provide all the details of category" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    let category = new Category({
      category_name: req.body.categoryName,
      category_image: result.secure_url,
      cloudinary_id: result.public_id,
    });

    await category.save();

    res.status(200).json({
      success: true,
      data: category,
      message: "Category added successfully"
    });
  } catch (err: any) {
    console.log({ error: err.message });
    res.status(500).json({ error: err.message });
  }
};
export const getAllCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.findAll();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err: any) {
    console.log({ error: err.message });
    res.status(500).json({ error: err.message });
  }
};

export const deleteCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    await cloudinary.uploader.destroy(category.cloudinary_id);
    await category.destroy();

    res.status(200).json({
      success: true,
      data: category,
      message: "Category deleted successfully"
    });
  } catch (err: any) {
    console.log({ error: err.message });
    res.status(500).json({ error: err.message });
  }
};

export const updateCategoryController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const categoryName = req.body.categoryName;

    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    if (categoryName) {
      category.category_name = categoryName;
    }

    if (req.file) {
      await cloudinary.uploader.destroy(category.cloudinary_id);

      const result = await cloudinary.uploader.upload(req.file.path);
      category.category_image = result.secure_url;
      category.cloudinary_id = result.public_id;
    }

    await category.save();

    res.status(200).json({
      success: true,
      data: category,
      message: "Category updated successfully",
    });
  } catch (err: any) {
    console.log({ error: err.message });
    res.status(500).json({ error: err.message });
  }
};

