import Joi from 'joi';

const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDate: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Confirm password must match the password',
        }),
}).prefs({ abortEarly: false });

const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const updateUserSchema = Joi.object({
    firstName: Joi.string().max(50).optional(),
    lastName: Joi.string().max(50).optional(),
    birthDate: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
});



export { signupSchema, signInSchema, updateUserSchema };
