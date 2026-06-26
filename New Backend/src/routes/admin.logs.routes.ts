import { Router } from "express";
import { getInventoryLogs } from "../controllers/admin.logs.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getInventoryLogs);

export default router;
