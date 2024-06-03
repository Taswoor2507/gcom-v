import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// dotenv configuration
dotenv.config({
  path: './.env'
});

// Create Express app
const app = express();

// CORS configuration
app.use(cors({
  origin: '*'
}));

// Built-in middlewares
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb', extended: 'true' }));
app.use(express.static('./public'));

// Reduce fingerprinting (optional)
app.disable("x-powered-by");

// Import user routes
import userRouter from './routes/user.routes.js';
app.use('/api/v1/users', userRouter);

// Import error middleware
import ErrorMiddleware from './middlewares/Error.middleware.js';
app.use(ErrorMiddleware);

export default app;
