"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudent = void 0;
const joi_1 = __importDefault(require("joi"));
const createStudent = joi_1.default.object().keys({
    classId: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    massarCode: joi_1.default.string().required(),
});
exports.createStudent = createStudent;
