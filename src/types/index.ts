import { Timestamp } from "firebase/firestore";
import { Document } from "mongoose";
import { Users } from "../enums/users";

export type csvParserType = {
  massarCode: string;
  name: string;
};

export type createStudent = {
  classId: string;
  name: string;
  massarCode: string;
};

export type Session = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  classId: string;
  teacherId: string;
  subject: string;
};

type classroomDetail = {
  currentAttends: number;
  currentAbsence: number;
  name: string;
  id: string;
};

export type Classroom = {
  id: string;
  students: createStudent & { id: string };
  name: string;
  abbreviation: string;
};

export type DashboardData = {
  currentClasses: number;
  currentAttends: number;
  currentAbsence: number;
  classrooms: classroomDetail[];
};

export type Absence = {
  sessionId: string;
  studentId: string;
  time: Timestamp;
  dayInMonth?: number;
};

export type createSessions = Array<Session>;

export interface RegisterInput {
  email: string;
  pwd: string;
}

export interface Admin extends Document {
  email: string;
  pwd: string;
  profileImg: string;
}

export interface Teacher {
  fullname: string;
  email: string;
  role: Users;
  invitationCode: string;
  loginId: string;
}
