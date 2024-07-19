const router = require("express").Router();
const ctrls = require("../controllers/product");
const { validateDto } = require("../middlewares/validation");
const { isAdmin } = require("../middlewares/isAdmin");
const { verifyToken } = require("../middlewares/verifyToken");

const Joi = require("joi");
const {
    stringReq,
    stringNumReq,
    productOptionSchema,
} = require("../middlewares/joiSchema");

router.get("/", ctrls.getProducts);

router.get("/:id", ctrls.getProductById);

router.post(
    "/",
    validateDto(
        Joi.object({
            name: stringReq,
            price: stringNumReq,
            description: stringReq,
            categoryId: stringReq,
            optionList: productOptionSchema,
        })
    ),
    verifyToken,
    isAdmin,
    ctrls.createProduct
);

router.put("/:id/is_show", verifyToken, isAdmin, ctrls.toggleIsShow);
router.put(
    "/:id",
    validateDto(
        Joi.object({
            name: stringReq,
            price: stringNumReq,
            description: stringReq,
            categoryId: stringReq,
            optionList: productOptionSchema,
        })
    ),
    verifyToken,
    isAdmin,
    ctrls.updateProduct
);

router.delete("/:id", verifyToken, isAdmin, ctrls.deleteProduct);

module.exports = router;
