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
const users_1 = require("../enums/users");
const generateFixRandomNumber_1 = __importDefault(require("../utils/generateFixRandomNumber"));
class TeacherClient {
    createTeacher(fullname, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(_1.db, "teachers"), {
                fullname,
                email,
                role: users_1.Users.teacher,
                invitation_code: (0, generateFixRandomNumber_1.default)(4),
            });
            return yield this.getTeacher(docRef.id);
        });
    }
    getTeacher(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = (0, firestore_1.doc)(_1.db, "teachers", id);
            const docSnap = yield (0, firestore_1.getDoc)(docRef);
            if (docSnap.exists())
                return docSnap.data();
            return null;
        });
    }
    getAllTeacher() {
        return __awaiter(this, void 0, void 0, function* () {
            const teachers = [];
            const querySnapshot = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(_1.db, "teachers"));
            querySnapshot.forEach((doc) => {
                teachers.push(Object.assign({ id: doc.id }, doc.data()));
            });
            return teachers;
        });
    }
}
exports.default = TeacherClient;
