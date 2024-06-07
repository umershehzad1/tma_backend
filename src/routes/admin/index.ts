import { schemaParseMiddleWare } from "@middleware/zodValidator";
import { addCollectionByAdmin } from "@utils/schema/admin";
import { addNewCollectionByAdmin } from "@v1/admin/private";
import { Router } from "express";

const ADMIN_ROUTER = Router();
ADMIN_ROUTER.post(
	"/collections/add",
	schemaParseMiddleWare(addCollectionByAdmin),
	addNewCollectionByAdmin,
);
export default ADMIN_ROUTER;
