import express from "express";
import { authMiddleware } from "../middleware/auth";
import {
  createBodyMass,
  deleteBodyMassById,
  getAllBodyMassbyUser,
  getLatestBodyMassbyUser,
  updateBodyMass,
} from "../controllers/bodyMassController";

export const bodyMassRouter = express.Router();
bodyMassRouter.use(authMiddleware);

bodyMassRouter.get("/", getAllBodyMassbyUser);
bodyMassRouter.get("/latest", getLatestBodyMassbyUser);
bodyMassRouter.post("/", createBodyMass);
bodyMassRouter.put("/", updateBodyMass);
bodyMassRouter.delete("/:id", deleteBodyMassById);
