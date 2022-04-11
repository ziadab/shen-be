import { Router } from "express"
import StudentClient from "../clients/studentClient"
import { createStudent } from "../validations/student.validation"

const router = Router()
const studentClient = new StudentClient()

router.post("/", async (req, res) => {
  const { error, value } = createStudent.validate(req.body)
  if (error) {
    const message = error.details.map((details) => details.message).join(", ")
    return res.status(400).json({ message, code: 400 })
  }

  const student = await studentClient.createStudent(value)
  return res.status(200).json(student)
})

router.patch("/:id", async (req, res) => {
  const id = req.params.id

  const { error, value } = createStudent.validate(req.body)
  if (error) {
    const message = error.details.map((details) => details.message).join(", ")
    return res.status(400).json({ message, code: 400 })
  }
  const data = await studentClient.updateStudent(id, value)
  res.status(200).json(data)
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  await studentClient.deleteStudent(id)
  return res.status(201).send("deleted")
})

export default router
