import express from "express";
import { authMiddleware } from "../middleware/auth";
import {
  authenticateMe,
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/me", authMiddleware, authenticateMe);
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
