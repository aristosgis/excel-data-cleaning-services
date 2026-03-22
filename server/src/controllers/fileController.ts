import { Request, Response } from "express";
import { processExcelFile } from "../services/fileService";
import { checkMonthlyLimit, incrementUsage } from "../services/usageService";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
const prisma = new PrismaClient();

export async function uploadFile(req: any, res: Response) {
  try {
    const userId = req.user.id;

    // 1. Free Plan limit check
    const limit = await checkMonthlyLimit(userId);
    if (!limit.allowed) {
      return res.status(403).json({ error: "Monthly limit (5 files) reached" });
    }

    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // 2. Process Excel file
    const { fileBuffer, fixedCount } = await processExcelFile(file.buffer, userId);

    // 3. Save file locally (for demo)
    const fileName = `cleaned_${Date.now()}.xlsx`;
    const filePath = path.join("uploads", fileName);

    fs.writeFileSync(filePath, fileBuffer);

    // 4. Save history
    await prisma.processedFile.create({
      data: {
        userId,
        fileName,
        fileUrl: filePath
      }
    });

    // 5. Update usage
    await incrementUsage(userId);

    res.json({
      message: "File processed successfully",
      downloadUrl: filePath,
      fixedDuplicates: fixedCount
    });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}