import { Router } from "express";

import { adminAuthenticate } from "../../middleware/adminAuth";
import upload from "../../util/multer";
import { addCategoryController, deleteCategoryController, getAllCategoryController, updateCategoryController } from "../../controllers/adminCategoriesController";
const adminCategoriesRouter = Router();

adminCategoriesRouter.post("/addCategory", adminAuthenticate, upload.single("image"), addCategoryController);
adminCategoriesRouter.get("/getAllCategories", adminAuthenticate, getAllCategoryController);
adminCategoriesRouter.delete("/deleteCategory/:id", adminAuthenticate, deleteCategoryController);
adminCategoriesRouter.put("/updateCategory/:id", adminAuthenticate, upload.single("image"), updateCategoryController);


export default adminCategoriesRouter;
