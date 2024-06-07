import { Router } from "express";
import { getAllCollections } from "@v1/collections";
const COLLECTION_ROUTER = Router();
COLLECTION_ROUTER.get("/all", getAllCollections);
export default COLLECTION_ROUTER;
