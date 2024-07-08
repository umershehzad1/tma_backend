
const app = require('express');
const { addCategoryController, getAllCategoryController, deleteCategoryController, updateCategoryController } = require('../../controller/dashboard/adminCategoriesController');
const { adminAuthenticate } = require('../../middleware/dashboard/adminAuth');
const upload = require('../../utils/multer');
const router = app.Router();

router.post('/addCategory', adminAuthenticate, upload.single("image"), addCategoryController);
router.get('/getAllCategories', adminAuthenticate, getAllCategoryController);
router.delete('/deleteCategory/:id', adminAuthenticate, deleteCategoryController);
router.put('/updateCategory/:id', adminAuthenticate, upload.single("image"), updateCategoryController);

// router.post('/resetPassword', verifyUser, resetPassword);
module.exports = router;

