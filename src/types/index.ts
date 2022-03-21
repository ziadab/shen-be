export type csvParserType = {
  massarCode: string
  name: string
}

export type createStudent = {
  classroomId: string
  name: string
  massarCode: string
}

export type createSession = {
  day: string
  startTime: string
  endTime: string
  classId: string
  teacherId: string
  subject: string
}
