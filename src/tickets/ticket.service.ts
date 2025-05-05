import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Users } from 'src/users/entities/Users.entity';
import { CreateTicketDto } from './dtos/create_ticket.dto';
import { FlightsRepository } from 'src/flights/repositories/flights.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tickets } from './entities/Tickets.entity';
import { Logger } from '@nestjs/common';
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
    newTickets: CreateTicketDto[],
    user: JwtPayload,
  ): Promise<Tickets[]> {
    const purchasedBy = await this.usersRepo.getUser(user.email);

    const tickets: Tickets[] = [];

    for (const newTicket of newTickets) {
      const { price, seatClass, flightId, passengerId } = newTicket;
      const passenger = await this.usersRepo.getPassengerById(passengerId);
      const flight = await this.flightsRepo.getFlight(flightId);

      const ticket = this.ticketsRepo.create({
        price,
        seatClass,
        flight,
        passenger,
        purchasedBy,
        purchaseAt: new Date(),
      });

      const savedTicket = await this.ticketsRepo.save(ticket);
      tickets.push(savedTicket);
    }

    return tickets;
  }

  public async getTickets(): Promise<Tickets[]> {
    return await this.ticketsRepo.find({
      relations: ['passenger'],
    });
  }

  public async getTicket(id: number) {
    const found = await this.ticketsRepo.findOne({ where: { id } });
    if (!found)
      throw new NotFoundException(`Ticket with id : ${id} is not found`);

    return found;
  }
  public async getAvailableFlights() {
    try {
      const availableFlights = await this.availFlightsRepo.find({
        where: { available: 1 },
      });
      return availableFlights;
    } catch (error) {
      Logger.error('Error fetching available flights:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve available flights',
      );
    }
  }
}
