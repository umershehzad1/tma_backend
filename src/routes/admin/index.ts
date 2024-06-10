import { schemaParseMiddleWare } from "@middleware/zodValidator";
import { addCollectionByAdmin, addProductByAdmin } from "@utils/schema/admin";
import { addNewCollectionByAdmin, addNewProduct } from "@v1/admin/private";
import { Router } from "express";

const ADMIN_ROUTER = Router();
ADMIN_ROUTER.post(
	"/collections/add",
	schemaParseMiddleWare(addCollectionByAdmin),
	addNewCollectionByAdmin,
);
ADMIN_ROUTER.post(
	"/products/add",
	schemaParseMiddleWare(addProductByAdmin),
	addNewProduct,
);
export default ADMIN_ROUTER;
