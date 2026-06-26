import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { getAllUsers } from "../controllers/admin.user.controller";

const router = Router();

router.get("/", requireAuth, getAllUsers);

export default router;
