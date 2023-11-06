import Joi from 'joi';


export const createContentSchema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    slug: Joi.string().required(),
    categories: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid('draft', 'published').required(),
});

export const updateContentSchema = Joi.object({
    title: Joi.string(),
    body: Joi.string(),
    slug: Joi.string(),
    categories: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid('draft', 'published'),
});
