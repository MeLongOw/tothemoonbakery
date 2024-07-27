const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        imageUrl: { type: String },
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isShow: {
            type: Boolean,
            required: true,
            default: true,
        },
        optionList: [
            {
                name: String,
                subOptions: [{ name: String, price: String }],
            },
        ],
        category: { type: mongoose.Schema.ObjectId, ref: "Category" },
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
