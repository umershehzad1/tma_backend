"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithGoogleValidator = exports.signupWithGoogleValidator = exports.signInWithCredentialsValidator = exports.signupWithCredentialsValidator = void 0;
const express_validator_1 = require("express-validator");
exports.signupWithCredentialsValidator = (0, express_validator_1.checkSchema)({
    name: {
        isString: {
            errorMessage: 'Name must be a string',
        },
        notEmpty: {
            errorMessage: 'Name is required',
        },
    },
    contactNumber: {
        isString: {
            errorMessage: 'Contact number must be a string',
        },
        notEmpty: {
            errorMessage: 'Contact number is required',
        },
    },
    token: {
        isString: {
            errorMessage: 'Token must be a string',
        },
        notEmpty: {
            errorMessage: 'Token is required',
        },
    },
    role: {
        optional: true,
        isString: {
            errorMessage: 'Role must be a string',
        },
    },
});
exports.signInWithCredentialsValidator = (0, express_validator_1.checkSchema)({
    token: {
        isString: {
            errorMessage: 'Token must be a string',
        },
        notEmpty: {
            errorMessage: 'Token is required',
        },
    },
});
exports.signupWithGoogleValidator = (0, express_validator_1.checkSchema)({
    token: {
        isString: {
            errorMessage: 'Token must be a string',
        },
        notEmpty: {
            errorMessage: 'Token is required',
        },
    },
    name: {
        isString: {
            errorMessage: 'Name must be a string',
        },
        notEmpty: {
            errorMessage: 'Name is required',
        },
    },
    role: {
        isString: {
            errorMessage: 'Role must be a string',
        },
        optional: true,
    },
});
exports.signInWithGoogleValidator = (0, express_validator_1.checkSchema)({
    token: {
        isString: {
            errorMessage: 'Token must be a string',
        },
        notEmpty: {
            errorMessage: 'Token is required',
        },
    },
});
