import { Request, Response } from "express";
import { getMonthlyUsage, getUserStats } from "../services/usageService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDashboardStats(req: any, res: Response) {
  try {
    const userId = req.user.id;

    const usage = await getMonthlyUsage(userId);
    const stats = await getUserStats(userId);

    const latestFiles = await prisma.processedFile.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5
    });

    res.json({
      usage,
      stats,
      latestFiles
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}