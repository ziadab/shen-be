import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import teacherRoute from "./routes/teacher.router"
import classroomRouter from "./routes/classroom.router"

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use("/teachers", teacherRoute)
app.use("/classrooms", classroomRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`🚀 listening on ${port}...`)
})
