const Joi = require('@hapi/joi')

const registerValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        cpf: Joi.string().required().min(11).max(11),
        phone: Joi.string(),
        payday: Joi.date()
    })

    return schema.validate(data)
}

const registerPayday = (data) => {
    const schema = Joi.object({
        cpf: Joi.string().required().min(11).max(11),
        payday: Joi.date().required()
    })

    return schema.validate(data)
}

module.exports.registerValidate = registerValidate
module.exports.registerPayday = registerPayday