"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const _1 = require(".");
const dayjs_1 = __importDefault(require("dayjs"));
class StudentClient {
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(_1.db, "students"), student);
            return this.getStudent(docRef.id);
        });
    }
    getStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(_1.db, "students", id);
            const docSnap = yield (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists())
                return docSnap.data();
            return null;
        });
    }
    getAllStudentsInClass() {
        return __awaiter(this, void 0, void 0, function* () {
            const students = [];
            const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(_1.db, "students"));
            querySnapshot.forEach((doc) => {
                students.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return students;
        });
    }
    deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(_1.db, "students", id);
            yield (0, firestore_1.deleteDoc)(docRef);
        });
    }
    updateStudent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(_1.db, "students", id);
            yield (0, firestore_1.updateDoc)(docRef, Object.assign({}, data));
            return this.getStudent(id);
        });
    }
    getAbsence(id, month, year) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedData = [];
            let monthlyReport = {};
            const firstDay = (0, dayjs_1.default)(new Date(year, month, 0)).utc().startOf("month");
            const endDay = (0, dayjs_1.default)(firstDay).utc().endOf("month");
            const q = (0, firestore_1.query)((0, firestore_1.collection)(_1.db, "absence"), (0, firestore_1.where)("studentId", "==", id), (0, firestore_1.where)("time", ">=", firstDay.toDate()), (0, firestore_1.where)("time", "<=", endDay.toDate()));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            querySnapshot.forEach((el) => {
                let data = el.data();
                data["dayInMonth"] = dayjs_1.default.unix(data.time.seconds).date();
                updatedData.push(data);
            });
            for (let i = 1; i <= endDay.daysInMonth(); i++) {
                monthlyReport[i] =
                    updatedData.length == 0
                        ? 0
                        : updatedData.filter((el) => el.dayInMonth == i).length;
            }
            return monthlyReport;
        });
    }
}
exports.default = StudentClient;
