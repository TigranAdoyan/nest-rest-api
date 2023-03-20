import * as Joi from 'joi';

export default {
    SignIn: {
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        })
    },
    SignUp: {
        body: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
            age: Joi.number().required(),
        })
    }
}