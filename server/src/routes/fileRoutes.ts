import express, { Router } from "express";
import {
  uploadFile,
  getHistory,
  getUsage,
  deleteFile
} from "../controllers/fileController";

import { authMiddleware } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

import { downloadFile } from "../controllers/fileDownloadController";   // ✅ Added

const router: Router = express.Router();

/**
 * ROUTES
 */

// Upload File (with multer)
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadFile
);

// Get file history
router.get(
  "/history",
  authMiddleware,
  getHistory
);

// Get usage stats
router.get(
  "/usage",
  authMiddleware,
  getUsage
);

// Secure File Download (NEW)
router.get(
  "/download/:id",
  authMiddleware,
  downloadFile                      // ✅ Added
);

// Delete a file
router.delete(
  "/:id",
  authMiddleware,
  deleteFile
);

export default router;