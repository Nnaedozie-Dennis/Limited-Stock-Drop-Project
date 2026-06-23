import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/admin.product.controller";

const router = Router();

router.post("/", requireAuth, createProduct);
router.put("/:id", requireAuth, updateProduct);
router.delete("/:id", requireAuth, deleteProduct);

export default router;
