import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import userRoutes from './routes/user.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js'; // Import testimonial routes
import corsOption from './configs/corsOption.js';

dotenv.config({ path: './env' });

const app = express();

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/testimonials', testimonialRoutes); // Use testimonial routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


