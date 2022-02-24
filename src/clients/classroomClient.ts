import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore"
import { db } from "."

export default class ClassroomClient {
  async createClassroom(name: string, abbreviation: string) {
    const docRef = await addDoc(collection(db, "classroom"), {
      name,
      abbreviation,
    })

    return await this.getClassroom(docRef.id)
  }

  async getClassroom(id: string) {
    const docRef = doc(db, "classroom", id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return docSnap.data()
    return null
  }

  async getAllClassroom() {
    const classrooms: any[] = []

    const querySnapshot = await getDocs(collection(db, "classroom"))
    querySnapshot.forEach((doc) => {
      classrooms.push({ id: doc.id, ...doc.data() })
    })

    return classrooms
  }
}
