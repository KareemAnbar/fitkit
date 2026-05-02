import express from "express";
import { authMiddleware } from "../middleware/auth";
import { getDashboardStats } from "../controllers/dashboardController";

export const dashboardRouter = express.Router();
dashboardRouter.use(authMiddleware);

dashboardRouter.get("/stats", getDashboardStats);
