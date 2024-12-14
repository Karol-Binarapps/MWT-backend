import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.MONGO_HOST || 'localhost',
  port: +process.env.MONGO_PORT || 27017,
  name: process.env.MONGO_DATABASE || 'warmagnet',
  user: process.env.MONGO_USERNAME || '',
  password: process.env.MONGO_PASSWORD || '',
}));
