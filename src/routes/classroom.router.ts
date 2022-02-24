import { Router } from "express"
import multer from "multer"
import ClassroomClient from "../clients/classroomClient"
import csvParser from "../utils/csvParser"
import * as classroomValidation from "../validations/classroom.validation"

const classroomRouter = Router()
const classroomClient = new ClassroomClient()
const upload = multer({ dest: "/temp/upload" })

classroomRouter.get("/", async (req, res) => {
  const teachers = await classroomClient.getAllClassroom()
  res.json(teachers).status(200)
})

classroomRouter.get("/:id", async (req, res) => {
  const teacher = await classroomClient.getClassroom(req.params.id)
  if (teacher) {
    return res.status(200).json(teacher)
  }
  return res.status(404).send("Not found")
})

classroomRouter.post("/", async (req, res) => {
  const { error, value } = classroomValidation.createClassroom.validate(
    req.body
  )

  if (error) {
    const message = error.details.map((details) => details.message).join(", ")
    return res.status(400).json({ message, code: 400 })
  }

  const data = await classroomClient.createClassroom(
    value.name,
    value.abbreviation
  )
  return res.status(200).json({ status: 200, data })
})

classroomRouter.post("/:id/upload", upload.single("file"), async (req, res) => {
  const teacher = await classroomClient.getClassroom(req.params.id)
  if (!teacher) return res.status(400).json({ message: "not found", code: 400 })

  if (req.file) csvParser(req.file)
  return res.status(200).send("thla")
})

export default classroomRouter
