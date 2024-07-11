"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithCredentials = exports.signupWithCredentials = exports.signInWithGoogle = exports.signupWithGoogle = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const firebase_1 = __importDefault(require("../firebase/firebase"));
const user_1 = __importDefault(require("../db/models/user"));
const catchAsyncErrors_1 = __importDefault(require("../middleware/catchAsyncErrors"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
/*
path : https://localhost:4000/api/auth/sign-up
body : {
  email : password,
  password : password,
  contactNumber : contactNumber,
}
*/
exports.signupWithGoogle = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new errorHandler_1.default(errors.array()[0].msg, 400));
    }
    const { token, name, role } = req.body;
    if (!token) {
        return next(new errorHandler_1.default("Provide token", 400));
    }
    const decodedToken = yield firebase_1.default.auth().verifyIdToken(token);
    const { email } = decodedToken;
    if (!email) {
        return next(new errorHandler_1.default("Email is required", 400));
    }
    const existingUser = yield user_1.default.findOne({ where: { email } });
    if (existingUser) {
        return next(new errorHandler_1.default("User already exists", 400));
    }
    const newUser = yield user_1.default.create({
        name,
        email,
        role: role || 'user',
        google_token: token,
    });
    if (!newUser) {
        return next(new errorHandler_1.default("Unable to create new user", 400));
    }
    const result = newUser.toJSON();
    return res.status(201).json({
        message: "User created successfully",
        data: result,
    });
}));
exports.signInWithGoogle = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new errorHandler_1.default(errors.array()[0].msg, 400));
    }
    const idToken = req.body.token;
    const decodedToken = yield firebase_1.default.auth().verifyIdToken(idToken);
    const { email } = decodedToken;
    const existingUser = yield user_1.default.findOne({ where: { email } });
    if (!existingUser) {
        return next(new errorHandler_1.default("User not found", 400));
    }
    const token = generateToken({ id: existingUser.id, role: existingUser.role });
    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
    });
}));
// Signup with Credentials Endpoint
exports.signupWithCredentials = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new errorHandler_1.default(errors.array()[0].msg, 400));
    }
    const { name, contactNumber, token, role } = req.body;
    if (!token) {
        return next(new errorHandler_1.default("Provide token", 400));
    }
    const decodedToken = yield firebase_1.default.auth().verifyIdToken(token);
    const { email } = decodedToken;
    if (!email) {
        return next(new errorHandler_1.default("Email is required", 400));
    }
    const existingUser = yield user_1.default.findOne({ where: { email } });
    if (existingUser) {
        return next(new errorHandler_1.default("User already exists", 400));
    }
    const newUser = yield user_1.default.create({
        name,
        email,
        role: role || 'user',
        phone: contactNumber,
    });
    if (!newUser) {
        return next(new errorHandler_1.default("Unable to create new user", 400));
    }
    const result = newUser.toJSON();
    // Ensure that deletedAt is a property in your User model or remove this line if not needed
    // delete result.deletedAt;
    return res.status(201).json({
        message: "User created successfully",
        data: result,
    });
}));
exports.signInWithCredentials = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new errorHandler_1.default(errors.array()[0].msg, 400));
    }
    const { token } = req.body;
    if (!token) {
        return next(new errorHandler_1.default("Provide token", 400));
    }
    const decodedToken = yield firebase_1.default.auth().verifyIdToken(token);
    const { email } = decodedToken;
    const userExist = yield user_1.default.findOne({ where: { email } });
    if (!userExist) {
        return next(new errorHandler_1.default("User not found", 400));
    }
    const newToken = generateToken({ id: userExist.id, role: userExist.role });
    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token: newToken,
    });
}));
