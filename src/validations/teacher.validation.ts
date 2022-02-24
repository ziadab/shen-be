import Joi from "joi"

const createTeacher = Joi.object().keys({
  email: Joi.string().required().email(),
  fullname: Joi.string().required().min(5),
})

export { createTeacher }
