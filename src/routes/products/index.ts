import { Router } from "express";
import { getSingleProductById } from "@v1/products";

const PRODUCT_ROUTER = Router();
PRODUCT_ROUTER.get("/:productId", getSingleProductById);
export default PRODUCT_ROUTER;
