import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore"
import { db } from "."

export default class ClassroomClient {
  docRef = collection(db, "classroom")

  async createClassroom(name: string, abbreviation: string) {
    const docRef = await addDoc(this.docRef, {
      name,
      abbreviation,
    })

    return await this.getClassroom(docRef.id)
  }

  async getClassroom(id: string) {
    const docRef = doc(db, "classroom", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const q = query(collection(db, "students"), where("classId", "==", id))
      const students: any[] = []

      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        students.push({ id: doc.id, ...doc.data() })
      })
      return { ...docSnap.data(), students, id: docSnap.id }
    }
    return null
  }

  async getAllClassroom() {
    const classrooms: any[] = []

    const querySnapshot = await getDocs(this.docRef)
    querySnapshot.forEach((doc) => {
      classrooms.push({ id: doc.id, ...doc.data() })
    })

    return classrooms
  }
}
