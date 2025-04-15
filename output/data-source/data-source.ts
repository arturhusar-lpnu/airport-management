import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

export const createDataSource = async (
  configService: ConfigService,
): Promise<DataSource> => {
  return new DataSource({
    type: 'postgres',
    synchronize: true,
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [path.join(__dirname, '../src/**/*entity.ts')],
    migrations: [path.join(__dirname, '../migrations/*.ts')],
    migrationsTableName: 'airport-migrations',
  });
};
