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
const classroomClient_1 = __importDefault(require("./classroomClient"));
const teacherClient_1 = __importDefault(require("./teacherClient"));
const dayjs_1 = __importDefault(require("dayjs"));
const teacherClient = new teacherClient_1.default();
const classroomClient = new classroomClient_1.default();
class SessionClient {
    constructor() {
        this.docRef = (0, firestore_1.collection)(_1.db, "session");
    }
    createSession(sessions) {
        return __awaiter(this, void 0, void 0, function* () {
            // const promises = sessions.map(async (el) => {
            //   // const sessionExist = await this.checkSessionExist(
            //   //   el.classId,
            //   //   el.teacherId,
            //   //   el.day
            //   // )
            //   // if (sessionExist) return
            const docRef = yield (0, firestore_1.addDoc)(this.docRef, sessions);
            return this.getSessionById(docRef.id);
            // })
            // const result = await Promise.all(promises)
            // return result
        });
    }
    getSessionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(_1.db, "session", id);
            const docSnap = yield (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists())
                return docSnap.data();
            return null;
        });
    }
    getSessionByTeacherId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacherExist = yield teacherClient.getTeacher(id);
            if (!teacherExist)
                return null;
            const q = (0, firestore_1.query)(this.docRef, (0, firestore_1.where)("teacherId", "==", id));
            const sessions = [];
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            querySnapshot.forEach((doc) => {
                sessions.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return Object.assign(Object.assign({}, teacherExist), { sessions });
        });
    }
    getSessionByClassroomId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const classroomExist = yield classroomClient.getClassroom(id);
            if (!classroomExist)
                return null;
            const q = (0, firestore_1.query)(this.docRef, (0, firestore_1.where)("classId", "==", id));
            const sessions = [];
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            querySnapshot.forEach((doc) => {
                sessions.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return Object.assign(Object.assign({}, classroomExist), { sessions });
        });
    }
    checkSessionExist(classId, teacherId, day) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = (0, firestore_1.query)(this.docRef, (0, firestore_1.where)("classId", "==", classId), (0, firestore_1.where)("teacherId", "==", teacherId), (0, firestore_1.where)("day", "==", day));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            if (querySnapshot.docs.length == 0)
                return false;
            return true;
        });
    }
    deleteSession(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(_1.db, "session", id);
            yield (0, firestore_1.deleteDoc)(docRef);
        });
    }
    updateSession(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(_1.db, "session", id);
            yield (0, firestore_1.updateDoc)(docRef, Object.assign({}, data));
            return this.getSessionById(id);
        });
    }
    getCurrentSessions() {
        return __awaiter(this, void 0, void 0, function* () {
            const time = (0, dayjs_1.default)().format("HH:mm");
            const temp = [];
            const q = (0, firestore_1.query)(this.docRef, (0, firestore_1.where)("startTime", "<=", time));
            const querySnapshot = yield (0, firestore_1.getDocs)(q);
            if (querySnapshot.docs.length == 0)
                temp;
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.endTime >= time)
                    temp.push(data);
            });
            return temp;
        });
    }
}
exports.default = SessionClient;
