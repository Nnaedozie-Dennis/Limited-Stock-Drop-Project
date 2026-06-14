import { Router } from "express";
import {
  createReservation,
  getReservationById,
  getReservations,
} from "../controllers/reservation.controller";
import { requireAuth } from "../middleware/auth";


const router = Router();

router.post("/", requireAuth, createReservation);
router.get("/:id", requireAuth, getReservationById);
router.get("/", requireAuth, getReservations);

export default router;
