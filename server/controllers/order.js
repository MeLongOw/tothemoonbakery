const Order = require("../models/order");
const asyncHandler = require("express-async-handler");
const { generateUUID } = require("../utils/helper");

const createOrder = asyncHandler(async (req, res) => {
    const { name, phone, email, address, note, cart } = req.body;

    let orderId = generateUUID();
    const isExistedOrderId = Order.findOne({ orderId });
    if (isExistedOrderId) {
        orderId = generateUUID();
    }
    const order = await Order.create({
        name,
        phone,
        email,
        address,
        note,
        cart,
        orderId,
    });
    if (order) {
        res.status(200).json({
            success: true,
            message: "Create order successfully",
            order,
        });
    }
    if (!order) {
        res.status(400).json({
            success: false,
            message: "Failed to create order. Something went wrong",
        });
    }
});

module.exports = {
    createOrder,
};
