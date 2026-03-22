import { Router } from "express";
import {
  signup,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword
} from "../controllers/authController";

const router = Router();

// Basic routes (from both files)
router.post("/signup", signup);
router.post("/login", login);

// Extra routes (from full version)
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;