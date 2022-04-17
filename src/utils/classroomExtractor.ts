import { Session } from "../types"

export default (sessions: Session[]) => {
  return sessions.map((session) => session.classId)
}
