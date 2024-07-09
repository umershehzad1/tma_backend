"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const authValidator_1 = require("../validators/authValidator");
const router = express_1.default.Router();
router.post('/signupWithGoogle', authValidator_1.signupWithGoogleValidator, authController_1.signupWithGoogle);
router.post('/google-signin', authValidator_1.signInWithGoogleValidator, authController_1.signInWithGoogle);
router.post('/signupWithCredentials', authValidator_1.signupWithCredentialsValidator, authController_1.signupWithCredentials);
router.post('/sign-in', authValidator_1.signInWithCredentialsValidator, authController_1.signInWithCredentials);
exports.default = router;
