import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function downloadFile(req: any, res: Response) {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    // 1. Find file in database
    const file = await prisma.processedFile.findUnique({
      where: { id: fileId }
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // 2. Protect user: Only owner or admin can download
    if (file.userId !== userId && req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // 3. Resolve file path securely
    const safePath = path.join(process.cwd(), file.fileUrl);

    // 4. Prevent path traversal attacks
    if (!safePath.startsWith(path.join(process.cwd(), "uploads"))) {
      return res.status(403).json({ error: "Invalid file path" });
    }

    // 5. Check file exists
    if (!fs.existsSync(safePath)) {
      return res.status(404).json({ error: "File not found on server" });
    }

    // 6. Send file for download
    res.download(safePath, file.fileName);

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to download file" });
  }
}