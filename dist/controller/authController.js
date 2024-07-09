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
const index_1 = __importDefault(require("../db/models/index"));
const firebase_1 = __importDefault(require("../firebase/firebase"));
const express_validator_1 = require("express-validator");
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
const signupWithGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { token, name, role } = req.body;
        if (!token) {
            return res.status(400).json({
                message: "Please provide a token",
            });
        }
        const decodedToken = yield firebase_1.default.auth().verifyIdToken(token);
        const { email } = decodedToken;
        const existingUser = yield index_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const newUser = yield index_1.default.create({
            name,
            email,
            role: role || 'user',
            google_token: token,
        });
        if (!newUser) {
            return res.status(400).json({
                message: "Unable to create new user",
            });
        }
        const result = newUser.toJSON();
        delete result.deletedAt;
        return res.status(201).json({
            message: "User created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.signupWithGoogle = signupWithGoogle;
const signInWithGoogle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const idToken = req.body.token;
        const decodedToken = yield firebase_1.default.auth().verifyIdToken(idToken);
        const { uid, email } = decodedToken;
        const existingUser = yield index_1.default.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const token = generateToken({ id: existingUser.id, role: existingUser.role });
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token,
        });
    }
    catch (error) {
        console.error("Google Sign-In Error:", error);
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.signInWithGoogle = signInWithGoogle;
// Signup with Credentials Endpoint
const signupWithCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, contactNumber, token, role } = req.body;
        if (!token) {
            return res.status(400).json({
                message: "Please provide a token",
            });
        }
        const decodedToken = yield firebase_1.default.auth().verifyIdToken(token);
        const { uid, email } = decodedToken;
        const existingUser = yield index_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const newUser = yield index_1.default.create({
            name,
            email,
            role: role || 'user',
            phone: contactNumber,
        });
        if (!newUser) {
            return res.status(400).json({
                message: "Unable to create new user",
            });
        }
        const result = newUser.toJSON();
        delete result.deletedAt;
        return res.status(201).json({
            message: "User created successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.signupWithCredentials = signupWithCredentials;
const signInWithCredentials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({
                message: "Please provide a token",
            });
        }
        const decodedToken = yield firebase_1.default.auth().verifyIdToken(token);
        const { uid, email } = decodedToken;
        const userExist = yield index_1.default.findOne({
            where: {
                email,
            },
        });
        if (!userExist) {
            return res.status(400).json({
                message: "User not found",
            });
        }
        const generateNewToken = generateToken({ id: userExist.id, role: userExist.role });
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: generateNewToken,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message,
        });
    }
});
exports.signInWithCredentials = signInWithCredentials;
