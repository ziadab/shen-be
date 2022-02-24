import { Router } from "express"
import TeacherClient from "../clients/teacherClient"
import * as teacherValidation from "../validations/teacher.validation"

const teacherRoute = Router()
const teacherClient = new TeacherClient()

teacherRoute.get("/", async (req, res) => {
  const teachers = await teacherClient.getAllTeacher()
  res.json(teachers).status(200)
})

teacherRoute.get("/:id", async (req, res) => {
  const teacher = await teacherClient.getTeacher(req.params.id)
  if (teacher) {
    return res.status(200).json(teacher)
  }
  return res.status(404).send("Not found")
})

teacherRoute.post("/", async (req, res) => {
  const { error, value } = teacherValidation.createTeacher.validate(req.body)
  if (error) {
    const message = error.details.map((details) => details.message).join(", ")
    return res.status(400).json({ message, code: 400 })
  }

  const data = await teacherClient.createTeacher(value.fullname, value.email)
  return res.status(200).json({ status: 200, data })
})

export default teacherRoute
