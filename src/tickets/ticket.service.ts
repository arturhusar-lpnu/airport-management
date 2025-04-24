import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/users/entities/Users.entity';
import { CreateTicketDto } from './dtos/create_ticket.dto';
import { FlightsRepository } from 'src/flights/repositories/flights.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tickets } from './entities/Tickets.entity';
import { AppDataSource } from 'src/db/data-source/data-source';
import { FlightAvailability } from 'src/flights/entities/available_flights.view.entity';
import { JwtPayload } from 'src/auth/jwt/jwt-payload.interface';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Tickets)
    private ticketsRepo: Repository<Tickets>,
    private flightsRepo: FlightsRepository,
    private usersRepo: UsersRepository,
    @InjectRepository(FlightAvailability)
    private availFlightsRepo: Repository<FlightAvailability>,
  ) {}

  async buyTicket(
    newTicket: CreateTicketDto,
    user: JwtPayload,
  ): Promise<Tickets> {
    const { price, seatClass, flightId } = newTicket;
    const passenger = await this.usersRepo.getPassenger(user);

    const flight = await this.flightsRepo.getFlight(flightId);

    const ticket = this.ticketsRepo.create({
      price,
      seatClass,
      flight,
      passenger,
      purchaseAt: new Date(),
    });

    return await this.ticketsRepo.save(ticket);
  }

  public async getTicket(id: number) {
    const found = await this.ticketsRepo.findOne({ where: { id } });
    if (!found)
      throw new NotFoundException(`Ticket with id : ${id} is not found`);

    return found;
  }

  public async getAvailableFlights() {
    const queryRunner = AppDataSource.createQueryRunner();
    // const availableFlights = await this.availFlightsRepo.find();
    const availableFlights = await queryRunner.manager.query(
      `SELECT * FROM flight_availability`,
    );

    return availableFlights;
  }
}
