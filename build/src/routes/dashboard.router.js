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
const sessionClient_1 = __importDefault(require("../clients/sessionClient"));
const express_1 = require("express");
const classroomExtractor_1 = __importDefault(require("../utils/classroomExtractor"));
const classroomClient_1 = __importDefault(require("../clients/classroomClient"));
const router = (0, express_1.Router)();
const sessionClient = new sessionClient_1.default();
const classroomClient = new classroomClient_1.default();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allSession = yield sessionClient.getCurrentSessions();
    const classrooms = (0, classroomExtractor_1.default)(allSession);
    const classroomsData = yield Promise.all(classrooms.map((el) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield classroomClient.getClassroom(el.classId);
        const sessionData = yield sessionClient.getAbsence(el.sessionId);
        return {
            id: data === null || data === void 0 ? void 0 : data.id,
            attends: (data === null || data === void 0 ? void 0 : data.students.length) - sessionData.length,
            absence: sessionData.length,
        };
    })));
    const attendances = classroomsData.reduce((a, b) => {
        return a + b.attends;
    }, 0);
    const absences = classroomsData.reduce((a, b) => {
        return a + b.absence;
    }, 0);
    return res.json({
        attendances,
        absences,
        currentClassrooms: classrooms.length,
        classrooms: classroomsData,
    });
}));
exports.default = router;
