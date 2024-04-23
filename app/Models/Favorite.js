'use strict'

const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product" },
}, { timestamps: true } );

mongoose.model('Favorite', schema);