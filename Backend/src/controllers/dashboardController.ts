import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import * as dashboardService from "../services/dashboardService";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const data = await dashboardService.getDashboardStats(userId);

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
