import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createDataSource } from 'output/data-source/data-source';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dataSource = await createDataSource(configService);
        return dataSource.options;
      },
    }),
    AuthModule,
    FlightsModule,
    TicketsModule,
    LuggagesModule,
  ],
})
export class AppModule {}
