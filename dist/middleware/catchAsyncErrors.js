"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsyncErrors = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
exports.default = catchAsyncErrors;
