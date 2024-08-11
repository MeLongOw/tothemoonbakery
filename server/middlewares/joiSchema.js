const Joi = require("joi");

exports.string = Joi.string().allow(null, "");
exports.number = Joi.number().allow(null, "");
exports.array = Joi.array().allow(null, "");
exports.stringReq = Joi.string().required();
exports.stringNumGte10000Req = Joi.string()
    .regex(/^[1-9]\d{4,}$/)
    .required();
exports.stringNumReq = Joi.string().regex(/^\d+$/).required();
exports.stringNum = Joi.string().regex(/^\d+$/);
exports.numberReq = Joi.number().required();
exports.arrayReq = Joi.array().required();
exports.date = Joi.date();
exports.dateReq = Joi.date().required();


exports.categorySchema = Joi.array().items(
    Joi.object().keys({
        id: Joi.string().allow(null, ""),
        name: Joi.string().required(),
        order: Joi.number().required(),
    })
);

exports.productOptionSchema = Joi.array().items(
    Joi.object().keys({
        id: Joi.string().allow(null, ""),
        _id: Joi.string().allow(null, ""),
        name: Joi.string().required(),
        subOptions: Joi.array().items(
            Joi.object().keys({
                id: Joi.string().allow(null, ""),
                _id: Joi.string().allow(null, ""),
                name: Joi.string().required(),
                price: Joi.string().regex(/^\d+$/).required(),
            })
        ),
    })
);
