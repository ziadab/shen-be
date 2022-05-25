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
const express_1 = require("express");
const studentClient_1 = __importDefault(require("../clients/studentClient"));
const student_validation_1 = require("../validations/student.validation");
const router = (0, express_1.Router)();
const studentClient = new studentClient_1.default();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = student_validation_1.createStudent.validate(req.body);
    if (error) {
        const message = error.details.map((details) => details.message).join(", ");
        return res.status(400).json({ message, code: 400 });
    }
    const student = yield studentClient.createStudent(value);
    return res.status(200).json(student);
}));
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { error, value } = student_validation_1.createStudent.validate(req.body);
    if (error) {
        const message = error.details.map((details) => details.message).join(", ");
        return res.status(400).json({ message, code: 400 });
    }
    const data = yield studentClient.updateStudent(id, value);
    res.status(200).json(data);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield studentClient.deleteStudent(id);
    return res.status(201).send("deleted");
}));
router.get("/:id/absence", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = req.params.id;
    const { month, year } = req.query;
    if (parseInt(month.toString()) > 12 || parseInt(month.toString()) < 0) {
        return res.json({ message: "month is not valid" });
    }
    const data = yield studentClient.getAbsence(studentId, parseInt(month.toString()), parseInt(year.toString()));
    return res.json(data).end();
}));
exports.default = router;
