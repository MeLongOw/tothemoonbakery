const Order = require("../models/order");
const Location = require("../models/location");

const asyncHandler = require("express-async-handler");
const { generateUUID } = require("../utils/helper");
const { sendPendingOrderMail } = require("../utils/sendMail");

const getOrders = asyncHandler(async (req, res) => {
    const { status, date } = req.query;

    console.log(new Date());

    const orders = await Order.find({
        status,
        createdAt: {
            $gte: new Date(date?.startDate),
            $lt: date?.endDate,
        },
    });
    res.status(200).json({
        success: true,
        message: "get orders successfully",
        orders,
    });
});

const createOrder = asyncHandler(async (req, res) => {
    const { name, phone, email, address, districtId, wardId, note, cart } =
        req.body;
    const district = await Location.findOne({ id: districtId });
    const ward = district.wards.find((el) => el.id === wardId);
    let orderId = generateUUID();
    const formattedAddress = `${address}, ${ward.name}, ${district.name}`;
    const isExistedOrderId = Order.findOne({ orderId });
    if (isExistedOrderId) {
        orderId = generateUUID();
    }
    const order = await Order.create({
        name,
        phone,
        email,
        address: formattedAddress,
        note,
        cart,
        orderId,
    });
    if (order) {
        await sendPendingOrderMail({ to: email, cart, orderId });
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

const updateStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    console.log({ status });

    const { id } = req.params;
    console.log({ id });

    const order = await Order.findByIdAndUpdate(id, { status });
    console.log({ order });
    if (order) {
        res.status(200).json({
            success: true,
            message: "Update status successfully",
        });
    }
    if (!order) {
        res.status(400).json({
            success: false,
            message: "Fail to update status. Something went wrong",
        });
    }
});

module.exports = {
    createOrder,
    getOrders,
    updateStatus,
};
