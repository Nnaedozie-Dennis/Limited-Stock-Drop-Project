import { Router } from "express";
import { checkoutReservation } from "../controllers/order.controller";

const router = Router();

router.post("/checkout", checkoutReservation);

export default router;
