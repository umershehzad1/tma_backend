import { Router } from "express";
import { schemaParseMiddleWare } from "@middleware/zodValidator";
import { adminSignUpSchema, adminLoginSchema } from "@schema/admin";
import { createAnAdminUser, loginAnAdminUser } from "@v1/admin/public";
const AUTH_PUBLIC_ROUTER = Router();
AUTH_PUBLIC_ROUTER.post(
	"/register/admin",
	schemaParseMiddleWare(adminSignUpSchema),
	createAnAdminUser,
);
AUTH_PUBLIC_ROUTER.post(
	"/login/admin",
	schemaParseMiddleWare(adminLoginSchema),
	loginAnAdminUser,
);
export default AUTH_PUBLIC_ROUTER;
