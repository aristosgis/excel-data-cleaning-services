import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

///////////////////////////////////////////////////
// 1. CHECK MONTHLY LIMIT (Already exists)
///////////////////////////////////////////////////
export async function checkMonthlyLimit(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new Error("User not found");

  const isNewMonth =
    new Date().getMonth() !== new Date(user.lastReset).getMonth();

  if (isNewMonth) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        monthlyUploads: 0,
        lastReset: new Date()
      }
    });
    return { allowed: true };
  }

  if (user.monthlyUploads >= 5) return { allowed: false };

  return { allowed: true };
}

///////////////////////////////////////////////////
// 2. INCREMENT MONTHLY USAGE (Already exists)
///////////////////////////////////////////////////
export async function incrementUsage(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { monthlyUploads: { increment: 1 } }
  });
}

///////////////////////////////////////////////////
// 3. GET MONTHLY USAGE (New for dashboard)
///////////////////////////////////////////////////
export async function getMonthlyUsage(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) throw new Error("User not found");

  return {
    used: user.monthlyUploads,
    limit: 5,
    resetDate: user.lastReset
  };
}

///////////////////////////////////////////////////
// 4. GET USER STATS (New for dashboard)
///////////////////////////////////////////////////
export async function getUserStats(userId: string) {
  const totalFilesProcessed = await prisma.processedFile.count({
    where: { userId }
  });

  return { totalFilesProcessed };
}