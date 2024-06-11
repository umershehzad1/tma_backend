import { Router } from "express";
import { getSingleProductById ,getAllProducts} from "@v1/products";

const PRODUCT_ROUTER = Router();
PRODUCT_ROUTER.get("/single/:productId", getSingleProductById);
PRODUCT_ROUTER.get("/all", getAllProducts);
export default PRODUCT_ROUTER;
