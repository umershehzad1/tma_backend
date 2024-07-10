import express from 'express';
import { adminAuthenticate } from '../../middleware/dashboard/adminAuth';
import multipleUpload from '../../utils/multipleUploadMulter';
import { addProductController, getAllProductController, deleteProductController, updateProductController } from '../../controller/dashboard/adminProductController';
const  router = express.Router();

router.post('/addProduct', adminAuthenticate, multipleUpload.array("images", 5), addProductController);
router.get('/getAllProducts', adminAuthenticate, getAllProductController);
router.delete('/deleteProduct/:id', adminAuthenticate, deleteProductController);
router.put('/updateProduct/:id', adminAuthenticate, multipleUpload.array("images", 5), updateProductController);

export default router;
