import { Request, Response } from express;
import { getAllUsers, getSystemStats, getAllLogs } from ..servicesadminService;

export async function adminUsers(req Request, res Response) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err any) {
    res.status(500).json({ error err.message });
  }
}

export async function adminStats(req Request, res Response) {
  try {
    const stats = await getSystemStats();
    res.json(stats);
  } catch (err any) {
    res.status(500).json({ error err.message });
  }
}

export async function adminLogs(req Request, res Response) {
  try {
    const logs = await getAllLogs();
    res.json(logs);
  } catch (err any) {
    res.status(500).json({ error err.message });
  }
}