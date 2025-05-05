import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tickets } from './entities/Tickets.entity';
import { Flights } from 'src/flights/entities/Flights.entity';
import { Users } from 'src/users/entities/Users.entity';
import { FlightsRepository } from 'src/flights/repositories/flights.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { FlightAvailability } from 'src/flights/entities/available_flights.view.entity';
import { Gates } from 'src/gates/entities/Gates.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Tickets,
      Flights,
      Users,
      FlightAvailability,
      Gates,
    ]),
  ],
  controllers: [TicketController],
  providers: [TicketService, FlightsRepository, UsersRepository],
})
export class TicketModule {}
