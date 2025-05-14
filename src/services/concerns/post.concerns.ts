import Joi from "joi";

const validatePostData = Joi.object({
  title: Joi.string().min(5).max(100).required().messages({
    "string.min": "O titulo deve ter no mínimo 5 caracteres",
    "string.max": "O titulo deve ter no maximo 100 caracteres",
    "string.required": "Este campo é obrigatório",
  }),
  author: Joi.string().min(3).max(50).required().messages({
    "string.min": "O nome do autor deve ter no mínimo 3 caracteres",
    "string.max": "O nome do autor deve ter no maximo 50 caracteres",
    "string.required": "Este campo é obrigatório",
  }),
  text: Joi.string().min(200).required().messages({
    "string.min": "O texto deve ter no mínimo 200 caracteres",
    "string.required": "Este campo é obrigatório",
  }),
});

export { validatePostData };
