import SessionClient from "../clients/sessionClient";
import { Router } from "express";
import classroomExtractor from "../utils/classroomExtractor";
import ClassroomClient from "../clients/classroomClient";

const router = Router();
const sessionClient = new SessionClient();
const classroomClient = new ClassroomClient();

router.get("/", async (req, res) => {
  const allSession = await sessionClient.getCurrentSessions();
  console.log(allSession)
  const classrooms = classroomExtractor(allSession);
  const classroomsData = await Promise.all(
    classrooms.map(async (el) => {
      const data = await classroomClient.getClassroom(el.classId);
      const sessionData = await sessionClient.getAbsence(el.sessionId);
      const attends = data?.students.length! - sessionData.length;
      return {
        id: data?.id,
        // @ts-ignore
        abbreviation: data?.abbreviation,
        attends: isNaN(attends) ? 0 : attends,
        absence: sessionData.length,
      };
    })
  );
  const attendances = classroomsData.reduce((a, b) => {
    return a + (isNaN(b.attends) ? 0 : b.attends);
  }, 0);

  const absences = classroomsData.reduce((a, b) => {
    return a + b.absence;
  }, 0);

  return res.json({
    attendances,
    absences,
    currentClassrooms: classrooms.length,
    classrooms: classroomsData,
  });
});

export default router;
