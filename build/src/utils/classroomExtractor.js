"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sessions) => {
    return sessions.map((session) => {
        return {
            classId: session.classId,
            sessionId: session.id,
        };
    });
};
