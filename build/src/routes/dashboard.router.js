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
    const classroomData = yield Promise.all(classrooms.map((el) => __awaiter(void 0, void 0, void 0, function* () { return yield classroomClient.getClassroom(el); })));
    console.log(classroomData);
    const allStudent = classroomData.reduce((a, b) => {
        return a + (b === null || b === void 0 ? void 0 : b.students.length);
    }, 0);
    return res.json({ hihi: classrooms, allStudent });
}));
exports.default = router;
