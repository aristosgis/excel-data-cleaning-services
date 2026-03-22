import { Request, Response, NextFunction } from "express";

export function adminMiddleware(req: any, res: Response, next: NextFunction) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
}