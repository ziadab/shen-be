import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "."
import { Users } from "../enums/users"
import generateFixRandomNumber from "../utils/generateFixRandomNumber"

export default class TeacherClient {
  async createTeacher(fullname: string, email: string) {
    const docRef = await addDoc(collection(db, "teachers"), {
      fullname,
      email,
      role: Users.teacher,
      invitation_code: generateFixRandomNumber(4),
    })

    return await this.getTeacher(docRef.id)
  }

  async getTeacher(id: string) {
    const docRef = doc(db, "teachers", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data()
    return null
  }

  async getAllTeacher() {
    const teachers: any[] = []

    const querySnapshot = await getDocs(collection(db, "teachers"))
    querySnapshot.forEach((doc) => {
      teachers.push({ id: doc.id, ...doc.data() })
    })

    return teachers
  }
}
