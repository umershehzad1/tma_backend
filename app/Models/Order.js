'use strict'

const mongoose = require('mongoose');
const schema = new mongoose.Schema({

    uuid: {type: String, required: true, unique: true},
    billingInfo: {type: String, default: ""},
	shippingInfo: {type: String, default: ""},
    additionInfo: {type: String, default: ""},
    paymentMethod: {type: String, default: ""},
    status: {type: String, default: "pending"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: {type: [mongoose.Schema.Types.ObjectId], ref: "Product", default: [] },
}, { timestamps: true } );

mongoose.model('Product', schema);