import { Session } from "../types"

export default (
  sessions: Session[]
): Array<{ classId: string; sessionId: string }> => {
  return sessions.map((session) => {
    return {
      classId: session.classId,
      sessionId: session.id,
    }
  })
}
