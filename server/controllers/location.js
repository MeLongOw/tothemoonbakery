const Location = require("../models/location");
const asyncHandler = require("express-async-handler");
const { districtAndWard } = require("../utils/location");

const getLocationList = asyncHandler(async (req, res) => {
    const locationList = await Location.find().sort({
        id: 1,
    });
    if (locationList.length) {
        res.status(200).json({
            success: true,
            message: "get location list successfullly",
            locationList,
        });
    }
    if (!locationList.length) {
        res.status(400).json({
            success: false,
            message: "failed get location list. Something went wrong",
        });
    }
});

const initLocation = asyncHandler(async (req, res) => {
    const locationList = await Location.find();
    if (!locationList.length) {
        districtAndWard.map(({ id, name, wards }) => {
            const convertedWard = wards.map(({ name, id, fee }) => ({
                id: id?.toString(),
                name: name?.toString(),
                fee: fee?.toString(),
            }));
            return Location.create({
                id: id?.toString(),
                name: name?.toString(),
                wards: convertedWard,
            });
        });
        await Promise.all();
        res.status(200).json({
            success: true,
            message: "initial location successfully",
        });
    }
    if (locationList.length) {
        res.status(200).json({
            success: true,
            message: "already initialized location",
        });
    }
});

const toggleShowDistrict = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const location = await Location.findById(id);

    if (location) {
        location.isShow = !location.isShow;
        await location.save();
        res.status(200).json({
            success: true,
            message: "toggle show location successfully",
        });
    }
    if (!location) {
        res.status(400).json({
            success: true,
            message: "Not found location",
        });
    }
});

const toggleShowWard = asyncHandler(async (req, res) => {
    const { districtId, wardId } = req.params;
    const location = await Location.findById(districtId);

    if (location) {
        const wards = location.wards.map((el) => {
            if (el._id.toString() === wardId) {
                el.isShow = !el.isShow;
            }
            return el;
        });
        location.wards = wards;
        await location.save();

        res.status(200).json({
            success: true,
            message: "toggle show ward successfully",
        });
    }
    if (!location) {
        res.status(400).json({
            success: true,
            message: "Not found district",
        });
    }
});

const updateFee = asyncHandler(async (req, res) => {
    const { districtId, wardId } = req.params;
    const { fee } = req.body;
    const location = await Location.findById(districtId);

    if (location) {
        const wards = location.wards.map((el) => {
            if (el._id.toString() === wardId) {
                el.fee = fee;
            }
            return el;
        });
        location.wards = wards;
        await location.save();

        res.status(200).json({
            success: true,
            message: "update fee ward successfully",
        });
    }
    if (!location) {
        res.status(400).json({
            success: true,
            message: "Not found district",
        });
    }
});

module.exports = {
    getLocationList,
    initLocation,
    toggleShowDistrict,
    toggleShowWard,
    updateFee,
};
