'use strict'

const mongoose = require('mongoose');
const schema = new mongoose.Schema({

	name: {type: String, required: true, trim: true, lowercase: true, trim: true },
	email: {type: String, required: true, unique: true, lowercase: true, trim: true },
	password: {type: String, required: true, select: false},
	resetPasswordCode: {type: String, default: null},
	resetPasswordExpires: {type: Date, default: Date},
	phone: {type: String, default: ""},
	billingInfo: {type: Array, default: []},
	shippingInfo: {type: Array, default: []},
	roles: {type: [String], default: ['user']}
}, { timestamps: true } );

mongoose.model('User', schema);