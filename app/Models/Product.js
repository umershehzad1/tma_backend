'use strict'

const mongoose = require('mongoose');
const schema = new mongoose.Schema({

    image: {type: String, default: ""},
    title: {type: String, required: true, unique: true},
    description: {type: String},
    price: {type: Number},
    stock_status: {type: String},
    discount: {type: Number,},
    category: {type: String},
    tags: {type: String},
    delivery_status:{type: String}
}, { timestamps: true } );

mongoose.model('Product', schema);