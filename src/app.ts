import express, { Application, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import config from './config';
import { errorHandler } from './middlewares/errorHandler.middleware';
import routes from './routes';
import logger from './utils/logger';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'API is up and running!' });
});

// Routes
app.use('/api', routes);

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

// Database Connection
mongoose
  .connect(config.dbUri)
  .then(() => {
    logger.info('Connected to MongoDB');
    
    // Start the server after successful DB connection
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}`);
    });
  })
  .catch((err) => logger.error(`MongoDB connection error: ${err.message}`));

export default app;