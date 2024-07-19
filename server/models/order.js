const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        note: {
            type: String,
        },
        orderId: {
            required: true,
            type: String,
            unique: true,
        },
        cart: [],
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
