import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import * as bodyMassService from "../services/bodyMassService";

export const getAllBodyMassbyUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const data = await bodyMassService.getAllBodyMassByUser(userId);

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
export const getLatestBodyMassbyUser = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;

    const data = await bodyMassService.getLatestBodyMassByUser(userId);

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createBodyMass = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const { body_mass, body_fat, created_at } = req.body;

    const data = await bodyMassService.createBodyMass(
      userId,
      body_mass,
      body_fat,
      created_at,
    );

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBodyMass = async (req: AuthRequest, res: Response) => {
  try {
    const { id, body_mass, body_fat, created_at } = req.body;

    const data = await bodyMassService.updateBodyMass(
      id,
      body_mass,
      body_fat,
      created_at,
    );

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBodyMassById = async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);

    const data = await bodyMassService.deleteBodyMassById(id);

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
