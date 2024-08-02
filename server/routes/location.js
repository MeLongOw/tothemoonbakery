const router = require("express").Router();
const ctrls = require("../controllers/location");
const { validateDto } = require("../middlewares/validation");
const { isAdmin } = require("../middlewares/isAdmin");
const { verifyToken } = require("../middlewares/verifyToken");

const Joi = require("joi");
const { arrayReq } = require("../middlewares/joiSchema");

router.get("/", ctrls.getLocationList);

router.post("/", ctrls.initLocation);

router.put(
    "/:id/toggle_show_district",
    // verifyToken,
    // isAdmin,
    ctrls.toggleShowDistrict
);
router.put(
    "/:districtId/ward/:wardId/update_fee",
    // verifyToken,
    // isAdmin,
    ctrls.updateFee
);

router.put(
    "/:districtId/toggle_show_ward/:wardId",
    // verifyToken,
    // isAdmin,
    ctrls.toggleShowWard
);

// router.put(
//     "/",
//     validateDto(
//         Joi.object({
//             categories: categorySchema,
//         })
//     ),
//     verifyToken,
//     isAdmin,
//     ctrls.createOrUpdateCategories
// );

module.exports = router;
