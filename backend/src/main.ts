import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import { configs } from './configs/configs';
import swaggerSpec from './docs/swagger.json';
import { ApiError } from './errors/api-errors';
import { apartmentRouter } from './routes/apartment.routes';

const app = express();
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Origin', 'Access-Control-Allow-Origin'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: {
    status: 429,
    message: 'Too Many Requests',
  },
});
app.use(limiter);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(express.urlencoded({ extended: true })); // Декодує x-www-form-urlencoded

app.use('/apartments', limiter, apartmentRouter);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// eslint-disable-next-line no-unused-vars
app.use('*', (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json(err.message);
});

process.on('uncaughtException', (e) => {
  console.error('uncaughtException', e.message, e.stack);
  process.exit(1);
});

app.listen(configs.APP_PORT, configs.APP_HOST, async () => {
  await mongoose.connect(configs.MONGO_URL, {});
  console.log(`Server is running on port ${configs.APP_PORT}`);
});
