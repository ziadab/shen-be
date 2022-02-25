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
const teacherClient_1 = __importDefault(require("../clients/teacherClient"));
const teacherValidation = __importStar(require("../validations/teacher.validation"));
const teacherRoute = (0, express_1.Router)();
const teacherClient = new teacherClient_1.default();
teacherRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teachers = yield teacherClient.getAllTeacher();
    res.json(teachers).status(200);
}));
teacherRoute.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacherClient.getTeacher(req.params.id);
    if (teacher) {
        return res.status(200).json(teacher);
    }
    return res.status(404).send("Not found");
}));
teacherRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = teacherValidation.createTeacher.validate(req.body);
    if (error) {
        const message = error.details.map((details) => details.message).join(", ");
        return res.status(400).json({ message, code: 400 });
    }
    const data = yield teacherClient.createTeacher(value.fullname, value.email);
    return res.status(200).json({ status: 200, data });
}));
exports.default = teacherRoute;
