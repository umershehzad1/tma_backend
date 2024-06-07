import { Router } from "express";
import AUTH_ROUTER from "@routes/auth";
import { isUserAuthenticated } from "@middleware/isUserAuthenticated";
import { isUserAdmin } from "@middleware/isUserAdmin";
import ADMIN_ROUTER from "./admin";
import COLLECTION_ROUTER from "./collection";

const MAIN_ROUTER = Router();
MAIN_ROUTER.use("/collections", COLLECTION_ROUTER);
MAIN_ROUTER.use("/auth", AUTH_ROUTER);
MAIN_ROUTER.use("/admin", isUserAuthenticated, isUserAdmin, ADMIN_ROUTER);
export default MAIN_ROUTER;
