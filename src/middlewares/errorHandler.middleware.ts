import { NextFunction, Request, Response } from 'express';

import logger from '../utils/logger';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: err.message
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.code === '11000') {
    return res.status(409).json({
      success: false,
      error: 'Duplicate Error',
      details: 'Resource already exists'
    });
  }

  // Handle custom errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message
    });
  }

  // Handle all other errors
  return res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
}; 