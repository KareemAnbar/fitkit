import express from "express";
import { authMiddleware } from "../middleware/auth";
import { getExerciseCatalog } from "../controllers/exerciseController";

export const exerciseRouter = express.Router();
exerciseRouter.use(authMiddleware);

exerciseRouter.get("/catalog", getExerciseCatalog);
