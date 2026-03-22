import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      monthlyUploads: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" }
  });
}

export async function getSystemStats() {
  const totalUsers = await prisma.user.count();
  const totalFiles = await prisma.processedFile.count();
  const totalLogs = await prisma.systemLog.count();

  return {
    totalUsers,
    totalFilesProcessed: totalFiles,
    totalLogs
  };
}

export async function getAllLogs() {
  return await prisma.systemLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });
}