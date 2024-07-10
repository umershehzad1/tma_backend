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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../db/models")); // Adjust the import path based on your actual file structure
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const catchAsyncErrors_1 = __importDefault(require("./catchAsyncErrors"));
dotenv_1.default.config({ path: `${process.cwd()}/.env` });
exports.authenticate = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return next(new errorHandler_1.default("Authentication Failed!", 401));
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
    const userExist = yield models_1.default.findOne({ _id: decodedToken.userId });
    if (!userExist) {
        return res.status(401).send({ error: "Authentication Failed!" });
    }
    req.token = token;
    req.user = userExist;
    req.userId = userExist._id;
    next();
}));
