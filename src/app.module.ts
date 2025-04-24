import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FlightsModule } from './flights/flights.module';
import { TicketModule } from './tickets/ticket.module';
import { GatesModule } from './gates/gates.module';
import { Users } from './users/entities/Users.entity';
import { Luggages } from './luggage/entities/Luggages.entity';
import { Flights } from './flights/entities/Flights.entity';
import { Tickets } from './tickets/entities/Tickets.entity';
import { RegisteredTickets } from './tickets/entities/RegisteredTickets.entity';
import { FlightSeats } from './flights/entities/FlightSeats.entity';
import { Gates } from './gates/entities/Gates.entity';
import { Aircrafts } from './airlines/entities/Aircrafts.entity';
import { Airlines } from './airlines/entities/Airlines.entity';
import { FlightPrices } from './flights/entities/FlightPrices.entity';
import { Terminals } from './terminals/entities/Terminals.entity';
import { Roles } from 'src/users/entities/Roles.entity';
import { UserRoles } from './users/user_role.enum';
import { AircraftModels } from './airlines/entities/AircraftModels.entity';
import { FlightAvailability } from './flights/entities/available_flights.view.entity';
// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: [`.env.config`],
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get('DB_HOST'),
//         port: configService.get('DB_PORT'),
//         username: configService.get('DB_USERNAME'),
//         password: configService.get('DB_PASSWORD'),
//         database: configService.get('DB_DATABASE'),
//         entities: [
//           Users,
//           Luggages,
//           Flights,
//           Tickets,
//           RegisteredTickets,
//           FlightSeats,
//           Gates,
//           Aircrafts,
//           AircraftModels,
//           Airlines,
//           FlightPrices,
//           Terminals,
//           Roles,
//           FlightAvailability,
//         ],
//         synchronize: true,
//       }),
//       // useFactory: async (configService: ConfigService) => ({
//       //   type: 'postgres',
//       //   synchronize: true,
//       //   host: configService.get('DB_HOST'),
//       //   port: configService.get('DB_PORT'),
//       //   username: configService.get('DB_USERNAME'),
//       //   password: configService.get('DB_PASSWORD'),
//       //   database: configService.get('DB_DATABASE'),
//       // }),
//       // useFactory: async (configService: ConfigService) => {
//       //   const host = configService.get('DB_HOST');
//       //   const port = configService.get('DB_PORT');
//       //   const username = configService.get('DB_USERNAME');
//       //   const password = configService.get('DB_PASSWORD');
//       //   const database = configService.get('DB_DATABASE');
//       //   return {
//       //     type: 'postgres',
//       //     synchronize: true,
//       //     host,
//       //     port,
//       //     username,
//       //     password,
//       //     database,
//       //   };
//       // },
//     }),
//     AuthModule,
//     FlightsModule,
//     TicketModule,
//     GatesModule,
//   ],
// })
// export class AppModule {}

//     {
//     // const dataSource = await createDataSource(configService);
//     // return dataSource.options;
//   },
// }),

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.config`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [
          Users,
          Luggages,
          Flights,
          Tickets,
          RegisteredTickets,
          FlightSeats,
          Gates,
          Aircrafts,
          AircraftModels,
          Airlines,
          FlightPrices,
          Terminals,
          Roles,
          FlightAvailability,
        ],
        synchronize: false,
      }),
    }),
    AuthModule,
    FlightsModule,
    TicketModule,
    GatesModule,
  ],
})
export class AppModule {}
