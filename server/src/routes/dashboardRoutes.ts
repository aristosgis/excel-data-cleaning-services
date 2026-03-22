import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getDashboardStats } from "../controllers/dashboardController";

const router = Router();

router.get("/stats", authMiddleware, getDashboardStats);

export default router;