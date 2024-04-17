'use strict'

const mongoose = require('mongoose');
const schema = new mongoose.Schema({

	username: {type: String, required: true, unique: true, trim: true },
	email: {type: String, required: true, unique: true, lowercase: true, trim: true },
	password: {type: String, required: true, select: false},
	resetPasswordCode: {type: String, default: null},
	resetPasswordExpires: {type: Date, default: Date},
	phone: {type: String, default: ""},
	address: {type: String, default: ""},
	image: {type: String, default: ""},
	roles: {type: [String], default: ['user']}
}, { timestamps: true } );

mongoose.model('User', schema);