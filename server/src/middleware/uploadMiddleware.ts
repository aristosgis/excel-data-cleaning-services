import multer from "multer";

const storage = multer.memoryStorage(); // keep file in memory

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for Free Plan
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith(".xlsx")) {
      return cb(new Error("Only .xlsx files are allowed"), false);
    }
    cb(null, true);
  }
});