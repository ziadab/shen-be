import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from ".";
import { createStudent, Absence } from "../types";
import dayjs from "dayjs";
export default class StudentClient {
  async createStudent(student: createStudent) {
    const docRef = await addDoc(collection(db, "students"), student);
    return this.getStudent(docRef.id);
  }

  async getStudent(id: string) {
    const docRef = doc(db, "students", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data();
    return null;
  }

  async getAllStudentsInClass() {
    const students: any[] = [];

    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((doc) => {
      students.push({ id: doc.id, ...doc.data() });
    });

    return students;
  }

  async deleteStudent(id: string) {
    const docRef = doc(db, "students", id);
    await deleteDoc(docRef);
  }

  async updateStudent(id: string, data: createStudent) {
    const docRef = doc(db, "students", id);
    await updateDoc(docRef, { ...data });
    return this.getStudent(id);
  }

  async getAbsence(id: string, month: number, year: number) {
    const updatedData: Absence[] = [];
    let monthlyReport: any = [];

    const firstDay = dayjs(new Date(year, month, 0)).utc().startOf("month");
    const endDay = dayjs(firstDay).utc().endOf("month");

    const q = query(
      collection(db, "absence"),
      where("studentId", "==", id),
      where("time", ">=", firstDay.toDate()),
      where("time", "<=", endDay.toDate())
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((el) => {
      let data = el.data() as Absence;
      data["dayInMonth"] = dayjs.unix(data.time.seconds).date();
      updatedData.push(data);
    });

    for (let i = 1; i <= endDay.daysInMonth(); i++) {
      monthlyReport.push({
        x: i,
        y:
          updatedData.length == 0
            ? 0
            : updatedData.filter((el) => el.dayInMonth == i).length,
      });
    }

    return { id: "Absence", data: monthlyReport };
  }
}
