import { Router } from "express"
import multer from "multer"
import ClassroomClient from "../clients/classroomClient"
import StudentClient from "../clients/studentClient"
import csvParser from "../utils/csvParser"
import * as classroomValidation from "../validations/classroom.validation"
import { extname } from "path"
import { csvParserType } from "../types"

const classroomRouter = Router()
const classroomClient = new ClassroomClient()
const studentClient = new StudentClient()
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

  if (req.file) {
    if (extname(req.file?.originalname!) != ".csv")
      return res.status(400).json({ message: "file not supported (only .csv)" })

    const students: any[] = []
    csvParser(req.file)
      .on("data", async (student: csvParserType) => {
        students.push(
          studentClient.createStudent({
            classroomId: req.params.id,
            ...student,
          })
        )
      })
      .on("end", async () => {
        const data = await Promise.all(students)
        console.log(data)
        return res.status(200).json({ data, code: 200 })
      })
  } else {
    return res.status(400).send("No file uploaded")
  }
})

export default classroomRouter
