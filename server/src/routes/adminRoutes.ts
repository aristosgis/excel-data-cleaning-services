import { Router } from "express";
import {
  getAllUsers,
  getStats,
  getLogs,
  resetAllUsage
} from "../controllers/adminController";

import { authMiddleware } from "../middleware/authMiddleware";

// Admin-only access middleware
const adminMiddleware = (req: any, res: any, next: any) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

const router = Router();

// Admin Routes
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/stats", authMiddleware, adminMiddleware, getStats);
router.get("/logs", authMiddleware, adminMiddleware, getLogs);
router.post("/reset-usage", authMiddleware, adminMiddleware, resetAllUsage);

export default router;