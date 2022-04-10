import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import teacherRoute from "./routes/teacher.router"
import classroomRouter from "./routes/classroom.router"
import sessionRouter from "./routes/session.router"

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use("/teachers", teacherRoute)
app.use("/classrooms", classroomRouter)
app.use("/sessions", sessionRouter)

export default app
