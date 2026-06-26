import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { getAllReservations } from "../controllers/admin.reservation.controller";

const router = Router();

router.get("/", requireAuth, getAllReservations);

export default router;
