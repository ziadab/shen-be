"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const teacher_router_1 = __importDefault(require("./routes/teacher.router"));
const classroom_router_1 = __importDefault(require("./routes/classroom.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use("/teachers", teacher_router_1.default);
app.use("/classrooms", classroom_router_1.default);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`🚀 listening on ${port}...`);
});
