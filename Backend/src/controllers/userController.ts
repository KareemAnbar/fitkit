import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { registerSchema } from "../utils/registerSchema";
import * as userService from "../services/userService";

export const authenticateMe = async (req: AuthRequest, res: Response) => {
  return res.json({
    user: req.user,
  });
};

export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const result = await userService.createUser(validatedData);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3600000,
    });

    return res.status(201).json({
      message: "User registered and logged in!",
      user: result.user,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await userService.loginUser(email, password);

    res.cookie("token", result.token, {
      httpOnly: true,
      secure: true, // true in production
      sameSite: "none",
      maxAge: 3600000,
    });

    return res.json({
      message: "Login successful",
      user: result.user,
    });
  } catch (error: any) {
    return res.status(400).json({
      error: error.message || "Login failed",
    });
  }
};

export const logoutUser = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  return res.json({ message: "Logged out successfully" });
};
