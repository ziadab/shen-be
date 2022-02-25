import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "."
import { createStudent } from "../types"

export default class StudentClient {
  async createStudent(student: createStudent) {
    const docRef = await addDoc(collection(db, "students"), student)
    return this.getStudent(docRef.id)
  }

  async getStudent(id: string) {
    const docRef = doc(db, "students", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data()
    return null
  }

  async getAllStudentsInClass() {
    const students: any[] = []

    const querySnapshot = await getDocs(collection(db, "students"))
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() })
    })

    return students
  }
}