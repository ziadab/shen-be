import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import StudentClient from "../clients/studentClient";
import { createStudent } from "../validations/student.validation";

const router = Router();
const studentClient = new StudentClient();

router.get("/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  const data = await studentClient.getStudent(id);
  if (data != null) return res.json(data);
  return res.status(404).json({ message: "student not found" });
});

router.post("/", isAuth, async (req, res) => {
  const { error, value } = createStudent.validate(req.body);
  if (error) {
    const message = error.details.map((details) => details.message).join(", ");
    return res.status(400).json({ message, code: 400 });
  }

  const student = await studentClient.createStudent(value);
  return res.status(200).json(student);
});

router.patch("/:id", isAuth, async (req, res) => {
  const id = req.params.id;

  const studentExist = await studentClient.getStudent(id);
  if (!studentExist) return res.json({ message: "Student doesn't exist" });

  const { error, value } = createStudent.validate(req.body);
  if (error) {
    const message = error.details.map((details) => details.message).join(", ");
    return res.status(400).json({ message, code: 400 });
  }
  const data = await studentClient.updateStudent(id, value);
  res.status(200).json(data);
});

router.delete("/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  await studentClient.deleteStudent(id);
  return res.status(201).send("deleted");
});

router.get("/:id/absence", isAuth, async (req, res) => {
  const studentId = req.params.id;
  const { month, year } = req.query;
  if (parseInt(month!.toString()) > 12 || parseInt(month!.toString()) < 0) {
    return res.json({ message: "month is not valid" });
  }
  const data = await studentClient.getAbsence(
    studentId,
    parseInt(month!.toString()),
    parseInt(year!.toString())
  );
  return res.json(data).end();
});

export default router;
