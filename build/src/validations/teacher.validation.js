"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeacher = void 0;
const joi_1 = __importDefault(require("joi"));
const createTeacher = joi_1.default.object().keys({
    email: joi_1.default.string().required().email(),
    fullname: joi_1.default.string().required().min(5),
});
exports.createTeacher = createTeacher;
