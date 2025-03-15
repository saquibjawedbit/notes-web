import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import userRoutes from './routes/user.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import subjectRouter from './routes/subject.routes.js'; // Import subject routes
import testimonialRoutes from './routes/testimonial.routes.js'; // Import testimonial routes
import paymentRouter from './routes/payment.routes.js'; // Import payment routes
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
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/payment', paymentRouter); // Use subject routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


