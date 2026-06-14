import { Router } from "express";
import {checkoutReservation, getOrders, getOrderById
} from "../controllers/order.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getOrders);
router.get("/:id", requireAuth, getOrderById);
router.post("/checkout", requireAuth, checkoutReservation);

export default router;
