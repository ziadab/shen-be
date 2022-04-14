export type csvParserType = {
  massarCode: string
  name: string
}

export type createStudent = {
  classId: string
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

type classroomDetail = {
  currentAttends: number
  currentAbsence: number
  name: string
}

export type DashboardData = {
  currentClasses: number
  currentAttends: number
  currentAbsence: number
  classrooms: classroomDetail[]
}

export type createSessions = Array<Session>
