const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        isShow: {
            type: Boolean,
            required: true,
            default: true,
        },
        order: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Category", categorySchema);
