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
exports.adminAuthenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../../db/models/index"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `${process.cwd()}/.env` });
const adminAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).send({ error: "Authentication Failed!" });
        }
        const decodeToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const userExist = yield index_1.default.findOne({ where: { id: decodeToken.id, role: decodeToken.role } });
        if (!userExist || userExist.role !== "admin") {
            return res.status(401).send({ error: "Authentication Failed!" });
        }
        req.token = token;
        req.user = userExist;
        req.userId = userExist.id; // Assuming `id` is the correct field for user ID
        next();
    }
    catch (error) {
        console.error(error.message);
        return res.status(401).send({ error: "Authentication Failed!" });
    }
});
exports.adminAuthenticate = adminAuthenticate;
