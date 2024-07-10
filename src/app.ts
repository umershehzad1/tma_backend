import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
const app = express();
const PORT = process.env.APP_PORT || 4000;
import adminCategoriesRoutes from './routes/dashboard/adminCategoriesRoutes';
import adminProductRoutes from './routes/dashboard/adminProductRoutes';

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin/category', adminCategoriesRoutes);
app.use('/api/admin/product', adminProductRoutes);

// /category
app.listen(PORT, () => {
    console.log(`Server up & running on port ${PORT}`);
});
