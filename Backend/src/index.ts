import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/users";
import dotenv from "dotenv";
import { bodyMassRouter } from "./routes/bodyMass";
import { workoutEntryRouter } from "./routes/workoutEntries";
import { exerciseRouter } from "./routes/exercises";
import { dashboardRouter } from "./routes/dashboard";
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/dashboard", dashboardRouter);
app.use("/users", userRouter);
app.use("/bodyMass", bodyMassRouter);
app.use("/exercise", exerciseRouter);
app.use("/workoutEntry", workoutEntryRouter);

app.listen(PORT, () => {});
