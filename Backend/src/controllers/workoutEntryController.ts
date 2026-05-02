import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import * as workoutEntryService from "../services/workoutEntryService";

export const getPRsByUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const data = await workoutEntryService.getPRsByUser(userId);

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getWorkoutEntriesByExercise = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;
    const exerciseId = req.params.id;
    const data = await workoutEntryService.getWorkoutEntriesByExercise(
      userId,
      exerciseId,
    );

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createWorkoutEntry = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const { exercise_id, weight, reps, sets, created_at } = req.body;

    const data = await workoutEntryService.createWorkoutEntry(
      userId,
      exercise_id,
      weight,
      reps,
      sets,
      created_at,
    );

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateWorkoutEntry = async (req: AuthRequest, res: Response) => {
  try {
    const { id, weight, reps, sets, created_at } = req.body;

    const data = await workoutEntryService.updateWorkoutEntry(
      id,
      weight,
      reps,
      sets,
      created_at,
    );

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteWorkoutEntry = async (req: AuthRequest, res: Response) => {
  try {
    const id = String(req.params.id);

    const data = await workoutEntryService.deleteWorkoutEntry(id);

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
