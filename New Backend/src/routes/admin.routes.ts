import { Router } from "express";
import { getAdminStats } from "../controllers/admin.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/stats", requireAuth, getAdminStats);

export default router;
