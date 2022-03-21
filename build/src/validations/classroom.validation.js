"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClassroom = void 0;
const joi_1 = __importDefault(require("joi"));
const createClassroom = joi_1.default.object().keys({
    name: joi_1.default.string().required().min(10),
    abbreviation: joi_1.default.string().required().max(5),
});
exports.createClassroom = createClassroom;
