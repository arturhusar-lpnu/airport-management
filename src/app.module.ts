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
import { AircraftModels } from './airlines/entities/AircraftModels.entity';
import { FlightAvailability } from './flights/entities/available_flights.view.entity';
import { Airports } from './flights/entities/Airports.entity';
import { SeatAvailability } from './flights/entities/SeatsAvailability.view.entity';
import { Registration } from './gates/entities/Registration.entity';
import { GateWorkload } from './stats/entities/GateWorkloads.entity';
import { MonthlyFlightStats } from './stats/entities/MonthlyFlightStats.entity';
import { StatsModule } from './stats/stats.module';
import { MaxWeight } from './flights/entities/MaxWeight.view.entity';
import { LuggagePerMonth } from './stats/entities/LuggagePerMonth.view.entity';
import { MostPopularArrivingRoutes } from './stats/entities/MostPopularArrivingRoutes.view.entity';
import { MostPopularDepartingRoutes } from './stats/entities/MostPopularDepartingRoutes.view.entity';
import { ActiveUsersByRole } from './stats/entities/ActiveUsersByRole.view.entity';
import { TopBuyingDays } from './stats/entities/TopBuying.view.entity';
import { TopAirports } from './stats/entities/TopAirports.view.entity';

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
          Airports,
          SeatAvailability,
          Registration,
          GateWorkload,
          MonthlyFlightStats,
          MaxWeight,
          LuggagePerMonth,
          MostPopularArrivingRoutes,
          MostPopularDepartingRoutes,
          ActiveUsersByRole,
          TopBuyingDays,
          TopAirports,
        ],
        synchronize: false,
      }),
    }),
    AuthModule,
    FlightsModule,
    TicketModule,
    GatesModule,
    StatsModule,
  ],
})
export class AppModule {}
