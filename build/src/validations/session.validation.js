"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const joi_1 = __importDefault(require("joi"));
const session = joi_1.default.object().keys({
    day: joi_1.default.string()
        .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
        .required(),
    startTime: joi_1.default.string()
        .regex(/^([0-9]{2})\:([0-9]{2})$/)
        .required(),
    endTime: joi_1.default.string()
        .regex(/^([0-9]{2})\:([0-9]{2})$/)
        .required(),
    classId: joi_1.default.string().required(),
    teacherId: joi_1.default.string().required(),
    subject: joi_1.default.string().required(),
});
const createSession = joi_1.default.array().items(session).min(1).max(6).required();
exports.createSession = createSession;
