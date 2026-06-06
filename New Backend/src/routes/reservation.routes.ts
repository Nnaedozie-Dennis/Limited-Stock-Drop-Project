import { Router } from "express";
import {
  createReservation,
  getReservationById,
  getReservations,
} from "../controllers/reservation.controller";


const router = Router();

router.post("/", createReservation);
router.get("/:id", getReservationById);
router.get("/", getReservations);

export default router;
