import express from 'express';
import { addCategoryController, getAllCategoryController, deleteCategoryController, updateCategoryController } from '../../controller/dashboard/adminCategoriesController';
import { adminAuthenticate } from '../../middleware/dashboard/adminAuth';
import upload from '../../utils/multer';
const router = express.Router();

router.post('/addCategory', adminAuthenticate, upload.single("image"), addCategoryController);
router.get('/getAllCategories', adminAuthenticate, getAllCategoryController);
router.delete('/deleteCategory/:id', adminAuthenticate, deleteCategoryController);
router.put('/updateCategory/:id', adminAuthenticate, upload.single("image"), updateCategoryController);

// router.post('/resetPassword', verifyUser, resetPassword);
export default router;

