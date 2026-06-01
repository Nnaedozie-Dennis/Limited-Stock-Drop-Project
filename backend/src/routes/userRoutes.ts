import { Router } from "express";
import {
  getUserReservations,
  getUserOrders,
} from "../controllers/userController";

const router = Router();

router.get("/:userId/reservations", getUserReservations);
router.get("/:userId/orders", getUserOrders);

export default router;
