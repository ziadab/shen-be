import Joi from "joi"

const createClassroom = Joi.object().keys({
  name: Joi.string().required().min(10),
  abbreviation: Joi.string().required().max(3),
})

export { createClassroom }
