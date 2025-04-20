import { Injectable, NotFoundException } from '@nestjs/common';
import { Gates } from './entities/Gates.entity';
import { FlightSeats } from 'src/flights/entities/FlightSeats.entity';

@Injectable()
export class GatesService {
  constructor(
    private gateRepo: GatesRepository,
    private ticketRepo: TicketsRepository,
    private luggageRepo: LuggageRepository,
    private flightSeatsRepo: FlightSeatsRepository,
  ) {}

  public async getGates(filterDto: GatesFilterDto): Promise<Gates[]> {
    return await this.gateRepo.getFilteredGates(filterDto);
  }

  public async getGateById(gatedId: number): Promise<Gates> {
    return await this.gateRepo.getGate(gatedId);
  }

  public async addGate(createGateDto: CreateGateDto): Promise<Gates> {
    return this.gateRepo.addGate(createGateDto);
  }

  public async assignGateManager(
    id: number,
    gateManagerDto: GateManagerDto,
  ): Promise<void> {
    return this.gateRepo.assignGateManager(id, gateManagerDto);
  }

  public async registerPassengerTicket(
    id: number,
    passengerId: string,
    ticketDto: TicketDto,
  ) {
    return this.gateRepo.regisetTicket(id, passengerId, ticketDto); //use flightsSeatsRepository to get an id also
  }

  public async registerLuggage(
    gateId: number,
    ticketId: number,
    luggageDto: LuggageDto,
  ) {

    const found = await 

    return this.luggageRepo.addLuggage(luggageDto); //add luggage thorugh LuggageRepo and assign the id to the ticket
  }

  public async updateLuggage(
    gateId: number,
    luggageId: number,
    updateLuggageDto: UpdateLuggageDto,
  ) {
    const found = await this.gateRepo.getLuggage(gateId, luggageId);
    if (!found) {
      throw new NotFoundException('Luggage is not registered');
    }

    return this.luggageRepo.updateLuggage(luggageId, updateLuggageDto); 
  }

  public async updateTicket(
    gateId: number,
    ticketId: number,
    updateTicketDto: UpdateTicketDto,
  ) {
    const found = await this.gateRepo.getTicket(gateId, ticketId);
    if (!found) {
      throw new NotFoundException('Ticket is not registered'); //Check for registered-ticket collection
    }
    return this.ticketRepo.updateTicket(ticketId, updateTicketDto); //I guess the registered-ticket-Repo is needed here
  }

  public async removeTicket(
    gateId: number,
    ticketId: number,
  ) {
    const found = await this.gateRepo.getTicket(gateId, ticketId);
    if (!found) {
      throw new NotFoundException('Ticket is not registered'); //use registered-ticket repo to remove the referenced ticket from collection
    }
    return this.gateRepo.removeTicket(gateId, ticketId);
  }

  public async removeLuggage(
    gateId: number,
    luggageId: number,
  ) {
    const found = await this.gateRepo.getLuggage(gateId, luggageId);
    if (!found) {
      throw new NotFoundException('Luggage is not registered'); 
    }

    return this.gateRepo.removeLuggage(gateId, luggageId);
  }
}
