const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().sort("order");
    res.status(200).json({
        success: true,
        message: "Get categories successfully",
        categories,
    });
});

const createOrUpdateCategories = asyncHandler(async (req, res) => {
    const { categories } = req.body;

    const promises = categories.map(async (el) => {
        if (el?.id) {
            const category = await Category.findById(el.id);
            if (category) {
                category.name = el.name;
                category.order = el.order;
                return category.save();
            }
            if (!category) {
                return Category.create({ name: el.name, order: el.order });
            }
        }
        if (!el?.id) {
            return Category.create({ name: el.name, order: el.order });
        }
    });
    const response = await Promise.all(promises);

    res.status(200).json({ success: true, response });
});

const deleteCategories = asyncHandler(async (req, res) => {
    const { categories } = req.body;

    const promises = categories.map((el) => {
        return Category.findByIdAndDelete(el);
    });

    const response = await Promise.all(promises);

    res.status(200).json({ success: true, response });
});

module.exports = {
    createOrUpdateCategories,
    getCategories,
    deleteCategories,
};
