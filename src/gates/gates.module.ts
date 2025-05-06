import { Module } from '@nestjs/common';
import { GatesController } from './gates.controller';
import { GatesService } from './gates.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Flights } from 'src/flights/entities/Flights.entity';
import { RegisteredTickets } from 'src/tickets/entities/RegisteredTickets.entity';
import { Tickets } from 'src/tickets/entities/Tickets.entity';
import { Luggages } from 'src/luggage/entities/Luggages.entity';
import { Gates } from './entities/Gates.entity';
import { Users } from 'src/users/entities/Users.entity';
import { GatesRepository } from './repositories/gate.repository';
import { FlightsRepository } from 'src/flights/repositories/flights.repository';
import { TicketsRepository } from 'src/tickets/repositories/tickets.repository';
import { LuggageRepository } from 'src/luggage/repositories/luggage.repository';
import { RegisterTicketsRepository } from 'src/tickets/repositories/register_tickets.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { FlightSeats } from 'src/flights/entities/FlightSeats.entity';
import { FlightsSeatsRepository } from 'src/flights/repositories/flight_seats.repository';
import { WeatherService } from 'src/weather-api/weather.service';
import { WeatherModule } from 'src/weather-api/weather.module';
import { Registration } from './entities/Registration.entity';
import { MaxWeight } from 'src/flights/entities/MaxWeight.view.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Flights,
      RegisteredTickets,
      Tickets,
      Luggages,
      Gates,
      Users,
      FlightSeats,
      Registration,
      MaxWeight,
    ]),
    WeatherModule,
  ],
  controllers: [GatesController],
  providers: [
    GatesService,
    GatesRepository,
    FlightsRepository,
    TicketsRepository,
    LuggageRepository,
    {
      provide: RegisterTicketsRepository,
      inject: [DataSource],
      useFactory: (dataSource: DataSource) =>
        new RegisterTicketsRepository(dataSource),
    },
    UsersRepository,
    FlightsSeatsRepository,
  ],
})
export class GatesModule {}
