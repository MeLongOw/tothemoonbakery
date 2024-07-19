const router = require("express").Router();
const ctrls = require("../controllers/category");
const { validateDto } = require("../middlewares/validation");
const { isAdmin } = require("../middlewares/isAdmin");
const { verifyToken } = require("../middlewares/verifyToken");

const Joi = require("joi");
const { categorySchema, arrayReq } = require("../middlewares/joiSchema");

router.get("/", ctrls.getCategories);

router.put(
    "/",
    validateDto(
        Joi.object({
            categories: categorySchema,
        })
    ),
    verifyToken,
    isAdmin,
    ctrls.createOrUpdateCategories
);

router.delete(
    "/",
    validateDto(
        Joi.object({
            categories: arrayReq,
        })
    ),
    verifyToken,
    isAdmin,
    ctrls.deleteCategories
);

module.exports = router;
