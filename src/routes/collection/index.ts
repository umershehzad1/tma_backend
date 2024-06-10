import { Router } from "express";
import {
	getAllCollections,
	getAllProductOfSingleCollection,
} from "@v1/collections";
const COLLECTION_ROUTER = Router();
COLLECTION_ROUTER.get("/all", getAllCollections);
COLLECTION_ROUTER.get("/:collection_id", getAllProductOfSingleCollection);
export default COLLECTION_ROUTER;
