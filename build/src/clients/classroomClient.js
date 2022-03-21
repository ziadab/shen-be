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
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const _1 = require(".");
class ClassroomClient {
    constructor() {
        this.docRef = (0, firestore_1.collection)(_1.db, "classroom");
    }
    createClassroom(name, abbreviation) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield (0, firestore_1.addDoc)(this.docRef, {
                name,
                abbreviation,
            });
            return yield this.getClassroom(docRef.id);
        });
    }
    getClassroom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(_1.db, "classroom", id);
            const docSnap = yield (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists()) {
                const q = (0, firestore_1.query)((0, firestore_1.collection)(_1.db, "students"), (0, firestore_1.where)("classroomId", "==", id));
                const students = [];
                const querySnapshot = yield (0, firestore_1.getDocs)(q);
                querySnapshot.forEach((doc) => {
                    students.push(Object.assign({ id: doc.id }, doc.data()));
                });
                return Object.assign(Object.assign({}, docSnap.data()), { students });
            }
            return null;
        });
    }
    getAllClassroom() {
        return __awaiter(this, void 0, void 0, function* () {
            const classrooms = [];
            const querySnapshot = yield (0, firestore_1.getDocs)(this.docRef);
            querySnapshot.forEach((doc) => {
                classrooms.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return classrooms;
        });
    }
}
exports.default = ClassroomClient;
