import { Injectable, NotFoundException } from '@nestjs/common';
import { Gates } from './entities/Gates.entity';
import { FlightSeats } from 'src/flights/entities/FlightSeats.entity';
import { LuggageRepository } from 'src/luggage/repositories/luggage.repository';
import { CreateLuggageDto } from 'src/luggage/dto/create_luggage.dto';
import { RegisterTicketsRepository } from 'src/tickets/repositories/register_tickets.repository';
import { Users } from 'src/users/entities/Users.entity';
import { RegisterTicketDto } from 'src/tickets/dtos/register_ticket.dto';
import { FlightsRepository } from 'src/flights/repositories/flights.repository';
import { GetFlightsFilterDto } from 'src/flights/dtos/get-flight-filter.dto';
import { GatesRepository } from './repositories/gate.repository';
@Injectable()
export class GatesService {
  constructor(
    private gateRepo: GatesRepository,
    private flightsRepo: FlightsRepository,
    private ticketRepo: TicketsRepository,
    private luggageRepo: LuggageRepository,
    private registerTicketRepo: RegisterTicketsRepository,
    private passengerRepo: PassengerRepository,
    private flightSeatsRepo: FlightSeatsRepository,
  ) {}

  public async getGates(): Promise<Gates[]> {
    return await this.gateRepo.getGates();
  }

  public async getGateById(gatedId: number): Promise<Gates> {
    return await this.gateRepo.getGate(gatedId);
  }

  public async generateReport(gateId: number): Promise<ReportDto> {
    const filter = new GetFlightsFilterDto();
    filter.gateId = gateId;

    const flights = await this.flightsRepo.getFlights(filter);
  }

  // public async assignGateManager( // TODO if have time
  //   id: number,
  //   gateManagerDto: GateManagerDto,
  // ): Promise<void> {
  //   return this.gateRepo.assignGateManager(id, gateManagerDto);
  // }

  public async getFlightSeats(): Promise<FlightSeats[]> {
    return await this.flightSeatsRepo.getAvailableSeats();
  }

  public async registerTicket(
    registerTicketDto: RegisterTicketDto,
    user: Users,
  ) {
    const { seatId, ticketId } = registerTicketDto;

    const ticket = await this.ticketRepo.getTicket(ticketId);

    const seat = await this.flightSeatsRepo.getSeat(seatId);

    const registeredTicket = this.registerTicketRepo.create({
      seat,
      registeredBy: user,
      registeredAt: Date.now(),
      ticket,
    });

    const registered = await this.registerTicketRepo.save(registeredTicket);

    await this.flightSeatsRepo.registerSeat(registered.id);

    return registered;
  }

  public async registerLuggage(luggageDto: CreateLuggageDto) {
    const { id, weight, status, passengerId, ticketId } = luggageDto;

    const ticket = await this.ticketRepo.getTicket(ticketId);

    if (!ticket) {
      throw new NotFoundException('Ticket is not found');
    }

    const registered = await this.registerTicketRepo.getTicket(ticketId);

    if (!registered) {
      throw new NotFoundException('Ticket is not registered yet');
    }

    const passenger = await this.passengerRepo.getPassenger(passengerId);

    if (!passenger) {
      throw new NotFoundException(`No Passenger found with id ${passengerId}`);
    }

    const luggage = this.luggageRepo.create({
      id,
      weight,
      status,
      ticket,
      passenger,
    });

    const registeredLuggage = await this.luggageRepo.save(luggage);

    return registeredLuggage;
  }

  public async updateLuggage(
    luggageId: number,
    updateLuggageDto: UpdateLuggageDto,
  ) {
    return this.luggageRepo.updateLuggage(luggageId, updateLuggageDto);
  }

  public async updateRegisteredTicket(
    ticketId: number,
    updateTicketDto: UpdateRegisteredTicketDto,
  ) {
    await this.registerTicketRepo.getTicket(ticketId);

    return this.registerTicketRepo.updateTicket(ticketId, updateTicketDto);
  }

  public async removeTicket(ticketId: number) {
    return this.registerTicketRepo.removeTicket(ticketId);
  }

  public async removeLuggage(luggageId: number) {
    return await this.luggageRepo.removeLuggage(luggageId);
  }
}
