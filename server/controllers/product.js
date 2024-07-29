const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

const getProducts = asyncHandler(async (req, res) => {
    const { _id } = req.query;
    const productList = await Product.find({ category: _id });

    if (productList?.length) {
        res.status(200).json({
            success: true,
            message: "Get products successfully",
            productList,
        });
    }
    if (!productList?.length) {
        res.status(200).json({
            success: false,
            message: "Something went wrong or do not have product to get",
        });
    }
});

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
        res.status(200).json({
            success: true,
            message: "Get product successfully",
            product,
        });
    }
    if (!product) {
        res.status(400).json({
            success: false,
            message: "Something went wrong or do not have product to get",
        });
    }
});

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, categoryId, optionList, imageUrl } =
        req.body;

    const product = await Product.create({
        name,
        price,
        description,
        category: categoryId,
        optionList,
        imageUrl,
    });
    if (product) {
        res.status(200).json({
            success: true,
            message: "create product successfully",
            product,
        });
    }
    if (!product) {
        res.status(400).json({
            success: false,
            message: "Failed to create product",
            product,
        });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, price, description, categoryId, optionList, imageUrl } =
        req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, {
        name,
        price,
        description,
        category: categoryId,
        optionList,
        imageUrl,
    });
    if (updatedProduct) {
        res.status(200).json({
            success: true,
            message: "Update product successfully",
            updatedProduct,
        });
    }
    if (!updatedProduct) {
        res.status(400).json({
            success: false,
            message: "Not found or something went wrong",
        });
    }
});

const toggleIsShow = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
        res.status(400).json({
            success: false,
            message: "Not found or something went wrong",
        });
    }
    if (product) {
        product.isShow = !product.isShow;
        await product.save();
        res.status(200).json({
            success: true,
            message: "Change isShow product successfully",
            product,
        });
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
        res.status(200).json({
            success: true,
            message: "Delete product successfully",
        });
    }
    if (!deletedProduct) {
        res.status(400).json({
            success: false,
            message: "Not found or something went wrong",
        });
    }
});

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    toggleIsShow,
    updateProduct,
    deleteProduct,
};
