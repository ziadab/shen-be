import { Router } from "express";
import multer from "multer";
import ClassroomClient from "../clients/classroomClient";
import StudentClient from "../clients/studentClient";
import csvParser from "../utils/csvParser";
import * as classroomValidation from "../validations/classroom.validation";
import { extname } from "path";
import { csvParserType } from "../types";
import { join } from "path";
import { isAuth } from "../middleware/isAuth";

const classroomRouter = Router();
const classroomClient = new ClassroomClient();
const studentClient = new StudentClient();

const upload = multer({ dest: join(__dirname, "../uploads") });

classroomRouter.get("/", isAuth, async (req, res) => {
  const classrooms = await classroomClient.getAllClassroom();
  res.json(classrooms).status(200);
});

classroomRouter.get("/:id", isAuth, async (req, res) => {
  const classroom = await classroomClient.getClassroom(req.params.id);
  if (classroom) {
    return res.status(200).json(classroom);
  }
  return res.status(404).send("Not found");
});

classroomRouter.delete("/:id", isAuth, async (req, res) => {
  await classroomClient.deleteClassroom(req.params.id);
  return res.status(201).send("deleted");
});

classroomRouter.post("/", isAuth, async (req, res) => {
  const { error, value } = classroomValidation.createClassroom.validate(
    req.body
  );

  if (error) {
    const message = error.details.map((details) => details.message).join(", ");
    return res.status(400).json({ message, code: 400 });
  }

  const data = await classroomClient.createClassroom(
    value.name,
    value.abbreviation
  );
  return res.status(200).json({ status: 200, data });
});

classroomRouter.post(
  "/:id/upload",
  isAuth,
  upload.single("file"),
  async (req, res) => {
    const teacher = await classroomClient.getClassroom(req.params.id);
    if (!teacher)
      return res.status(400).json({ message: "not found", code: 400 });

    if (req.file) {
      if (extname(req.file?.originalname!) != ".csv")
        return res
          .status(400)
          .json({ message: "file not supported (only .csv)" });

      const students: any[] = [];
      csvParser(req.file)
        .on("data", async (student: csvParserType) => {
          students.push(
            studentClient.createStudent({
              classId: req.params.id,
              massarCode: student.massarCode,
              name: student.name,
            })
          );
        })
        .on("end", async () => {
          const data = await Promise.all(students);
          return res.status(200).json({ data, code: 200 });
        });
    } else {
      return res.status(400).send("No file uploaded");
    }
  }
);

classroomRouter.patch("/:id", isAuth, async (req, res) => {
  const id = req.params.id;

  const classroomExist = await classroomClient.getClassroom(id);
  if (!classroomExist) return res.json({ message: "Classroom doesn't exist" });

  const { error, value } = classroomValidation.createClassroom.validate(
    req.body
  );

  if (error) {
    const message = error.details.map((details) => details.message).join(", ");
    return res.status(400).json({ message, code: 400 });
  }

  const data = await classroomClient.updateClassroom(id, req.body);
  return res.json(data);
});

export default classroomRouter;
