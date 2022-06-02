import Joi from "joi";

const createAdmin = Joi.object().keys({
  email: Joi.string().required().email(),
  pwd: Joi.string().required().min(8),
});

export { createAdmin };
