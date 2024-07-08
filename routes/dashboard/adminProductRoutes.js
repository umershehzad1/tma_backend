const express = require('express');
const { adminAuthenticate } = require('../../middleware/dashboard/adminAuth');
const multipleUpload = require('../../utils/multipleUploadMulter');
const { addProductController, getAllProductController, deleteProductController, updateProductController } = require('../../controller/dashboard/adminProductController');
const router = express.Router();

router.post('/addProduct', adminAuthenticate, multipleUpload.array("images", 5), addProductController);
router.get('/getAllProducts', adminAuthenticate, getAllProductController);
router.delete('/deleteProduct/:id', adminAuthenticate, deleteProductController);
router.put('/updateProduct/:id', adminAuthenticate, multipleUpload.array("images", 5), updateProductController);

module.exports = router;
