import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from ".";
import { Users } from "../enums/users";
import generateFixRandomNumber from "../utils/generateFixRandomNumber";

export default class TeacherClient {
  async createTeacher(fullname: string, email: string) {
    const docRef = await addDoc(collection(db, "teachers"), {
      fullname,
      email,
      role: Users.teacher,
      invitationCode: generateFixRandomNumber(4),
      loginId: "",
    });

    return await this.getTeacher(docRef.id);
  }

  async deleteTeacher(id: string) {
    const docRef = doc(db, "teachers", id);
    await deleteDoc(docRef);
  }

  async getTeacher(id: string) {
    const docRef = doc(db, "teachers", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { ...docSnap.data(), id: docSnap.id };
    return null;
  }

  async getAllTeacher() {
    const teachers: any[] = [];

    const querySnapshot = await getDocs(collection(db, "teachers"));
    querySnapshot.forEach((doc) => {
      teachers.push({ id: doc.id, ...doc.data() });
    });

    return teachers;
  }

  async updateTeacher(id: string, data: Teacher) {
    const docRef = doc(db, "teachers", id);
    await updateDoc(docRef, { ...data });
    return this.getTeacher(id);
  }
}
