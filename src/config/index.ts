import dotenv from 'dotenv';

dotenv.config();

const configuration = {
  dbUri: process.env.MONGODB_URI,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  env: process.env.NODE_ENV || 'development',
};

export default configuration;
