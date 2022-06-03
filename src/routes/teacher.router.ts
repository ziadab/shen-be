import { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import ClassroomClient from "../clients/classroomClient";
import SessionClient from "../clients/sessionClient";
import TeacherClient from "../clients/teacherClient";
import { Session } from "../types";
import * as sessionValidation from "../validations/session.validation";
import * as teacherValidation from "../validations/teacher.validation";

const teacherRoute = Router();
const teacherClient = new TeacherClient();
const sessionClient = new SessionClient();
const classroomClient = new ClassroomClient();

teacherRoute.get("/", isAuth, async (req, res) => {
  const teachers = await teacherClient.getAllTeacher();
  res.json(teachers).status(200);
});

teacherRoute.get("/:id", isAuth, async (req, res) => {
  const teacher = await sessionClient.getSessionByTeacherId(req.params.id);
  if (teacher) {
    return res.status(200).json(teacher);
  }
  return res.status(404).send("Not found");
});

teacherRoute.delete("/:id", isAuth, async (req, res) => {
  await teacherClient.deleteTeacher(req.params.id);
  return res.status(201).send("deleted");
});

teacherRoute.post("/", isAuth, async (req, res) => {
  const { error, value } = teacherValidation.createTeacher.validate(req.body);
  if (error) {
    const message = error.details.map((details) => details.message).join(", ");
    return res.status(400).json({ message, code: 400 });
  }

  const data = await teacherClient.createTeacher(value.fullname, value.email);
  return res.status(200).json({ status: 200, data });
});

teacherRoute.post("/:id/sessions", isAuth, async (req, res) => {
  const reqData: Session = req.body;
  const { error, value } = sessionValidation.updateSession.validate(reqData);

  if (error) {
    const message = error.details.map((details) => details.message).join(", ");
    return res.status(400).json({ message, code: 400 });
  }

  const [classroomExist, teacherExist] = await Promise.all([
    classroomClient.getClassroom(value.classId),
    teacherClient.getTeacher(value.teacherId),
  ]);

  if (!classroomExist || !teacherExist)
    return res
      .status(400)
      .json({ message: "teacher or classroom does not exist", status: 401 });

  const data = await sessionClient.createSession(value);
  return res.status(200).json(data);
});

export default teacherRoute;
