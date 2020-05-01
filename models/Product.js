const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
}, {timestamps: true});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;