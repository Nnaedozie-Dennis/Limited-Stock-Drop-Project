import { Router } from "express";
import { getAllOrders } from "../controllers/admin.order.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getAllOrders);

export default router;
