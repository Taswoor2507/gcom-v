import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// Error middleware
import ErrorMiddleware from './middlewares/Error.middleware.js';
// Import user routes
import userRouter from './routes/user.routes.js';

// dotenv configuration
dotenv.config({
  path: './.env'
});

// Debugging: Print environment variables
// console.log(`Environment: ${process.env.PORT}`);

const app = express();

// CORS configuration
app.use(cors({
  origin: '*'
}));

// Built-in middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb', extended: 'true' }));
app.use(express.static('./public'));

app.use('/api/v1/users', userRouter);
app.use(ErrorMiddleware);

export default app;
