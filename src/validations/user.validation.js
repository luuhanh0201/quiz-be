import Joi from "joi";

export const signUpValid = Joi.object({
    username: Joi.string().required().min(5).max(50),
    password: Joi.string().required().min(5).max(50),
    email: Joi.string().email().required(),
    confirmPassword: Joi.valid(Joi.ref("password")).required(),
    role: Joi.string(),
    avatar: Joi.string().allow("", null),
});
export const signInValid = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
});
