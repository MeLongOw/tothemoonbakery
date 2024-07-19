const router = require("express").Router();
const ctrls = require("../controllers/order");
const { validateDto } = require("../middlewares/validation");
const { isAdmin } = require("../middlewares/isAdmin");
const { verifyToken } = require("../middlewares/verifyToken");

const Joi = require("joi");


router.post(
    "/",
    // validateDto(
    //     Joi.object({
    //         categories: categorySchema,
    //     })
    // ),
    ctrls.createOrder
);


module.exports = router;
