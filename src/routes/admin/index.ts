import { schemaParseMiddleWare } from "@middleware/zodValidator";
import { addCollectionByAdmin, addProductByAdmin } from "@utils/schema/admin";
import { addNewCollectionByAdmin, addNewProduct,updateTheCollection } from "@v1/admin/private";
import { Router } from "express";
import multer from "@middleware/multer";
const ADMIN_ROUTER = Router();
ADMIN_ROUTER.post(
	"/collections/add",
	multer.single("category_image"),
	schemaParseMiddleWare(addCollectionByAdmin),
	addNewCollectionByAdmin,
);
ADMIN_ROUTER.post(
	"/products/add",
	multer.array("product_images"),
	
	schemaParseMiddleWare(addProductByAdmin),
	addNewProduct,
);
ADMIN_ROUTER.put("/collections/update/:collection_id",
	multer.single("image"),
	schemaParseMiddleWare(addCollectionByAdmin),
	updateTheCollection

	
)
export default ADMIN_ROUTER;
