"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const classroomClient_1 = __importDefault(require("../clients/classroomClient"));
const sessionClient_1 = __importDefault(require("../clients/sessionClient"));
const teacherClient_1 = __importDefault(require("../clients/teacherClient"));
const sessionValidation = __importStar(require("../validations/session.validation"));
const sessionRouter = (0, express_1.Router)();
const classroomClient = new classroomClient_1.default();
const teacherClient = new teacherClient_1.default();
const sessionClient = new sessionClient_1.default();
sessionRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqData = req.body.sessions;
    const { error, value } = sessionValidation.createSession.validate(reqData);
    if (error) {
        const message = error.details.map((details) => details.message).join(", ");
        return res.status(400).json({ message, code: 400 });
    }
    const [classroomExist, teacherExist] = yield Promise.all([
        classroomClient.getClassroom(reqData[0].classId),
        teacherClient.getTeacher(reqData[0].teacherId),
    ]);
    if (!classroomExist || !teacherExist)
        return res
            .status(401)
            .json({ message: "teacher or classroom does not exist", status: 401 });
    const data = yield sessionClient.createSessions(reqData);
    return res.status(200).json(data);
}));
sessionRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherId = req.params.id;
    const teacherExist = yield teacherClient.getTeacher(teacherId);
    if (!teacherExist)
        return res.status(404).json({ message: "Not found" });
    const data = yield sessionClient.getSessionByTeacherId(teacherId);
    return res.status(200).json({ data });
}));
exports.default = sessionRouter;
