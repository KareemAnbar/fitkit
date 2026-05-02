import express from "express";
import { authMiddleware } from "../middleware/auth";
import {
  createWorkoutEntry,
  deleteWorkoutEntry,
  getPRsByUser,
  getWorkoutEntriesByExercise,
  updateWorkoutEntry,
} from "../controllers/workoutEntryController";

export const workoutEntryRouter = express.Router();
workoutEntryRouter.use(authMiddleware);

workoutEntryRouter.get("/prs", getPRsByUser);
workoutEntryRouter.get("/exercise/:id", getWorkoutEntriesByExercise);
workoutEntryRouter.post("/", createWorkoutEntry);
workoutEntryRouter.put("/", updateWorkoutEntry);
workoutEntryRouter.delete("/:id", deleteWorkoutEntry);
