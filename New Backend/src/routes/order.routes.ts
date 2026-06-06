import { Router } from "express";
import {checkoutReservation, getOrders, getOrderById
} from "../controllers/order.controller";

const router = Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/checkout", checkoutReservation);

export default router;
