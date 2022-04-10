import Joi from "joi"

const session = Joi.object().keys({
  day: Joi.string()
    .valid("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
    .required(),
  startTime: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required(),
  endTime: Joi.string()
    .regex(/^([0-9]{2})\:([0-9]{2})$/)
    .required(),
  classId: Joi.string().required(),
  teacherId: Joi.string().required(),
  subject: Joi.string().required(),
})

const createSessions = Joi.array().items(session).min(1).max(6).required()
const updateSession = session

export { createSessions, updateSession }
