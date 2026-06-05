import { Router } from "express";
import { createReservation, getReservationById } from "../controllers/reservation.controller";


const router = Router();

router.post("/", createReservation);
router.get("/:id", getReservationById);

export default router;
