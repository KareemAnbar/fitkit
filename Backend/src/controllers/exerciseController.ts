import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import * as exerciseService from "../services/exerciseService";

export const getExerciseCatalog = async (req: AuthRequest, res: Response) => {
  try {
    const data = await exerciseService.getExerciseCatalog();

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
