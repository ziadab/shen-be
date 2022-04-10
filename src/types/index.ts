export type csvParserType = {
  massarCode: string
  name: string
}

export type createStudent = {
  classroomId: string
  name: string
  massarCode: string
}

export type Session = {
  day: string
  startTime: string
  endTime: string
  classId: string
  teacherId: string
  subject: string
}

export type createSessions = Array<Session>
