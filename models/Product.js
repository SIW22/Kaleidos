const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    itemName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        // data: Buffer,
    }
}, {timestamps: true});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;