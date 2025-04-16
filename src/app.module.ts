import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FlightsModule } from './flights/flights.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory: async (configService: ConfigService) => ({
      //   type: 'postgres',
      //   synchronize: true,
      //   host: configService.get('DB_HOST'),
      //   port: configService.get('DB_PORT'),
      //   username: configService.get('DB_USERNAME'),
      //   password: configService.get('DB_PASSWORD'),
      //   database: configService.get('DB_DATABASE'),
      // }),
      useFactory: async (configService: ConfigService) => {
        console.log(process.env.STAGE);
        const host = configService.get('DB_HOST');
        const port = configService.get('DB_PORT');
        const username = configService.get('DB_USERNAME');
        const password = configService.get('DB_PASSWORD');
        const database = configService.get('DB_DATABASE');
        return {
          type: 'postgres',
          synchronize: true,
          host,
          port,
          username,
          password,
          database,
        };
      },
    }),
    AuthModule,
    FlightsModule,
    //TicketsModule,
    //LuggagesModule,
  ],
})
export class AppModule {}

//     {
//     // const dataSource = await createDataSource(configService);
//     // return dataSource.options;
//   },
// }),
