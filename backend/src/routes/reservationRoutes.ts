import { Router } from "express";
import { createReservation } from "../controllers/reservationController";

const router = Router();

router.post("/reserve", createReservation);

export default router;
