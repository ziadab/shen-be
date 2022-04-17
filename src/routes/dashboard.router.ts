import SessionClient from "../clients/sessionClient"
import { Router } from "express"
import classroomExtractor from "../utils/classroomExtractor"
import ClassroomClient from "../clients/classroomClient"

const router = Router()
const sessionClient = new SessionClient()
const classroomClient = new ClassroomClient()

router.get("/", async (req, res) => {
  const allSession = await sessionClient.getCurrentSessions()
  const classrooms = classroomExtractor(allSession)
  const classroomData = await Promise.all(
    classrooms.map(async (el) => await classroomClient.getClassroom(el))
  )

  console.log(classroomData)
  const allStudent = classroomData.reduce((a, b) => {
    return a + b?.students.length!
  }, 0)

  return res.json({ hihi: classrooms, allStudent })
})

export default router
