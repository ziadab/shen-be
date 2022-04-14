import {
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  where,
  query,
  collection,
  getDocs,
} from "firebase/firestore"
import { db } from "."
import { Session } from "../types"
import ClassroomClient from "./classroomClient"
import TeacherClient from "./teacherClient"

const teacherClient = new TeacherClient()
const classroomClient = new ClassroomClient()

export default class SessionClient {
  docRef = collection(db, "session")

  async createSession(sessions: Session) {
    // const promises = sessions.map(async (el) => {
    //   // const sessionExist = await this.checkSessionExist(
    //   //   el.classId,
    //   //   el.teacherId,
    //   //   el.day
    //   // )
    //   // if (sessionExist) return
    const docRef = await addDoc(this.docRef, sessions)
    return this.getSessionById(docRef.id)
    // })

    // const result = await Promise.all(promises)
    // return result
  }

  async getSessionById(id: string) {
    const docRef = doc(db, "session", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data()
    return null
  }

  async getSessionByTeacherId(id: string) {
    const teacherExist = await teacherClient.getTeacher(id)
    if (!teacherExist) return null
    const q = query(this.docRef, where("teacherId", "==", id))
    const sessions: any[] = []

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() })
    })

    return { ...teacherExist, sessions }
  }

  async getSessionByClassroomId(id: string) {
    const classroomExist = await classroomClient.getClassroom(id)
    if (!classroomExist) return null
    const q = query(this.docRef, where("classId", "==", id))
    const sessions: any[] = []

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      sessions.push({ id: doc.id, ...doc.data() })
    })

    return { ...classroomExist, sessions }
  }

  async checkSessionExist(
    classId: string,
    teacherId: string,
    day: string
  ): Promise<Boolean> {
    const q = query(
      this.docRef,
      where("classId", "==", classId),
      where("teacherId", "==", teacherId),
      where("day", "==", day)
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length == 0) return false
    return true
  }

  async deleteSession(id: string) {
    const docRef = doc(db, "session", id)
    await deleteDoc(docRef)
  }

  async updateSession(id: string, data: Session) {
    const docRef = doc(db, "session", id)
    await updateDoc(docRef, { ...data })
    return this.getSessionById(id)
  }

  async getSessionByTime(time: string): Promise<Array<Session>> {
    const temp: Session[] = []

    const q = query(this.docRef, where("startTime", "<=", time))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length == 0) temp
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Session
      if (data.endTime >= time) temp.push(data)
    })
    return temp
  }
}
