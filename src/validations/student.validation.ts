import Joi from "joi"

const createStudent = Joi.object().keys({
  classId: Joi.string().required(),
  name: Joi.string().required(),
  massarCode: Joi.string().required(),
})

export { createStudent }
