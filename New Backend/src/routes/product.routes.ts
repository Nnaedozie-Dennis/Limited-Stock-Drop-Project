import { Router } from "express";
import { getProducts, getProductById } from "../controllers/product.controller";
import { requireAuth } from "../middleware/auth";


const router = Router();

router.get("/", requireAuth, getProducts);
router.get("/:id", requireAuth, getProductById);

export default router;