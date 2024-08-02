const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var locationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    isShow: {
        type: Boolean,
        required: true,
        default: true,
    },
    wards: [
        {
            id: { type: String, required: true },
            name: { type: String, required: true },
            fee: { type: String, required: true },
            isShow: {
                type: Boolean,
                required: true,
                default: true,
            },
        },
    ],
});

//Export the model
module.exports = mongoose.model("Location", locationSchema);
