import Joi from "joi";

export const createLabelSchema = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().default("#000000")
});

export const getLabelSchema = Joi.object({
  labelId: Joi.string().required(),
});

export const updateLabelSchema = Joi.object({
  labelId: Joi.string().required(),
  name: Joi.string(),
  color: Joi.string(),
});
