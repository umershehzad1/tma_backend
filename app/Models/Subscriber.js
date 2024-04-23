'use strict'

const mongoose = require('mongoose');
const schema = new mongoose.Schema({

    email: {type: String, required: true, unique: true, lowercase: true, trim: true },
    newsletter: {type: Boolean, default: false},
}, { timestamps: true } );

mongoose.model('Subscriber', schema);