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
const multer_1 = __importDefault(require("multer"));
const classroomClient_1 = __importDefault(require("../clients/classroomClient"));
const studentClient_1 = __importDefault(require("../clients/studentClient"));
const csvParser_1 = __importDefault(require("../utils/csvParser"));
const classroomValidation = __importStar(require("../validations/classroom.validation"));
const path_1 = require("path");
const path_2 = require("path");
const classroomRouter = (0, express_1.Router)();
const classroomClient = new classroomClient_1.default();
const studentClient = new studentClient_1.default();
const upload = (0, multer_1.default)({ dest: (0, path_2.join)(__dirname, "../uploads") });
classroomRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classrooms = yield classroomClient.getAllClassroom();
    res.json(classrooms).status(200);
}));
classroomRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classroom = yield classroomClient.getClassroom(req.params.id);
    if (classroom) {
        return res.status(200).json(classroom);
    }
    return res.status(404).send("Not found");
}));
classroomRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = classroomValidation.createClassroom.validate(req.body);
    if (error) {
        const message = error.details.map((details) => details.message).join(", ");
        return res.status(400).json({ message, code: 400 });
    }
    const data = yield classroomClient.createClassroom(value.name, value.abbreviation);
    return res.status(200).json({ status: 200, data });
}));
classroomRouter.post("/:id/upload", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const teacher = yield classroomClient.getClassroom(req.params.id);
    if (!teacher)
        return res.status(400).json({ message: "not found", code: 400 });
    if (req.file) {
        if ((0, path_1.extname)((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname) != ".csv")
            return res.status(400).json({ message: "file not supported (only .csv)" });
        const students = [];
        (0, csvParser_1.default)(req.file)
            .on("data", (student) => __awaiter(void 0, void 0, void 0, function* () {
            students.push(studentClient.createStudent({
                classroomId: req.params.id,
                massarCode: student.massarCode,
                name: student.name,
            }));
        }))
            .on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield Promise.all(students);
            return res.status(200).json({ data, code: 200 });
        }));
    }
    else {
        return res.status(400).send("No file uploaded");
    }
}));
exports.default = classroomRouter;
