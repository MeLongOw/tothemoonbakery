const router = require("express").Router();
const ctrls = require("../controllers/order");
const { validateDto } = require("../middlewares/validation");
const { isAdmin } = require("../middlewares/isAdmin");
const { verifyToken } = require("../middlewares/verifyToken");

const Joi = require("joi");
const { date, stringReq } = require("../middlewares/joiSchema");

router.get("/", verifyToken, isAdmin, ctrls.getOrders);

router.put("/:id/status", verifyToken, isAdmin, ctrls.updateStatus);

router.post("/", ctrls.createOrder);


module.exports = router;
