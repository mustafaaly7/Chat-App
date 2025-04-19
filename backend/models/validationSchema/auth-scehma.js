import Joi from 'joi';

// Signup validation schema
export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullname: Joi.string().required(),
  picture: Joi.string().uri().optional(),
});

// Login validation schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
