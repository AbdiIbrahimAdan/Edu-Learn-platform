import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import  teacherRoutes from './routes/teacher.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { config } from 'dotenv';

config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/admin', adminRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
