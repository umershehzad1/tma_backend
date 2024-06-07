import { Router } from "express";
import AUTH_PRIVATE_ROUTER from "@routes/auth/private";
import AUTH_PUBLIC_ROUTER from "@routes/auth/public";

const AUTH_ROUTER = Router();
AUTH_ROUTER.use(AUTH_PRIVATE_ROUTER);
AUTH_ROUTER.use(AUTH_PUBLIC_ROUTER);
export default AUTH_ROUTER;
