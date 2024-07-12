import express from "express";
import { adminAuthenticate } from "../../middleware/adminAuth";
import multipleUpload from "../../util/multipleUploadMulter";
import { addProductController, getAllProductController, deleteProductController, updateProductController } from "../../controllers/adminProductController";
const  adminProductRoutes = express.Router();

adminProductRoutes.post("/addProduct", adminAuthenticate, multipleUpload.array("images", 5), addProductController);
adminProductRoutes.get("/getAllProducts", adminAuthenticate, getAllProductController);
adminProductRoutes.delete("/deleteProduct/:id", adminAuthenticate, deleteProductController);
adminProductRoutes.put("/updateProduct/:id", adminAuthenticate, multipleUpload.array("images", 5), updateProductController);

export default adminProductRoutes;
