"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.APP_PORT || 4000;
const adminCategoriesRoutes_1 = __importDefault(require("./routes/dashboard/adminCategoriesRoutes"));
const adminProductRoutes_1 = __importDefault(require("./routes/dashboard/adminProductRoutes"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/admin/category', adminCategoriesRoutes_1.default);
app.use('/api/admin/product', adminProductRoutes_1.default);
// /category
app.listen(PORT, () => {
    console.log(`Server up & running on port ${PORT}`);
});
