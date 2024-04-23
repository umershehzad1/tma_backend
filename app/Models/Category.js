'use strict'

const mongoose = require('mongoose');
const schema = new mongoose.Schema({

    name: {type: String, required: true, unique: true},
    image: {type: String, default: ""}
}, { timestamps: true } );

mongoose.model('Category', schema);