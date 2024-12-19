import { ConfigService } from '@nestjs/config';

export const getMongoUri = (configService: ConfigService): string => {
  const user = configService.get<string>('database.user');
  const password = configService.get<string>('database.password');
  const host = configService.get<string>('database.host');
  const port = configService.get<number>('database.port');
  const database = configService.get<string>('database.name');

  const auth = user && password ? `${user}:${password}@` : '';

  return `mongodb://${auth}${host}:${port}/${database}?authSource=admin`;
};
