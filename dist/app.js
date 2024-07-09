"use strict";
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = process.env.APP_PORT || 4000;
const adminCategoriesRoutes = require('./routes/dashboard/adminCategoriesRoutes');
const adminProductRoutes = require('./routes/dashboard/adminProductRoutes');
require('dotenv').config({ path: `${process.cwd()}/.env` });
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin/category', adminCategoriesRoutes);
app.use('/api/admin/product', adminProductRoutes);
// /category
const server = app.listen(PORT, () => {
    console.log(`Server up & running on port ${PORT}`);
});
process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise rejection");
    server.close(() => {
        process.exit(1);
    });
});
