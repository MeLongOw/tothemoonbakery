const router = require("express").Router();
const ctrls = require("../controllers/user");
const { validateDto } = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/verifyToken");

const Joi = require("joi");
const { stringReq } = require("../middlewares/joiSchema");

router.post(
    "/register",
    validateDto(
        Joi.object({
            name: stringReq,
            phone: stringReq,
            email: stringReq,
            username: stringReq.min(6),
            password: stringReq.min(8),
        })
    ),
    ctrls.register
);

router.post(
    "/login",
    validateDto(
        Joi.object({
            username: stringReq,
            password: stringReq,
        })
    ),
    ctrls.login
);

router.get("/current", verifyToken, ctrls.getCurrentUser);

module.exports = router;
