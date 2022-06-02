import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";

import teacherRoute from "./routes/teacher.router";
import classroomRouter from "./routes/classroom.router";
import sessionRouter from "./routes/session.router";
import studentRouter from "./routes/student.router";
import dashboardRouter from "./routes/dashboard.router";
import generateRouter from "./routes/generate.router";
import loginRouter from "./routes/login.router";
import registerRouter from "./routes/register.router";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "3mb" }));

app.use("/teachers", teacherRoute);
app.use("/classrooms", classroomRouter);
app.use("/sessions", sessionRouter);
app.use("/students", studentRouter);
app.use("/dashboard", dashboardRouter);
app.use("/generate", generateRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

export default app;
