const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            min: 5,
            max: 50,
            required: true,
        },
        description: {
            type: String,
            min: 5,
            max: 150,
            default: "hello",
        },
        price: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('Product', ProductSchema);