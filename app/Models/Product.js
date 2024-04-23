'use strict'

const mongoose = require('mongoose');
const schema = new mongoose.Schema({

    name: {type: String, required: true, unique: true},
    price: {type: Number, default: 5.00},
    discount: {type: Number, default: 0},
    discountDate: {type: Date},
    size: {type: String, default: ""},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    rating: {type: Number, default: 0},
    quantity: {type: Number, default: 0},
    description: {type: String, default: ""},
    featuredImage: {type: String, default: ""},
    images: {type: Array, default: []},
    isFeatured: {type: Boolean, default: false},
    tags: {type: Array, default: []}
}, { timestamps: true } );

mongoose.model('Product', schema);