import { Injectable, NotFoundException } from '@nestjs/common';
import { Gates } from './entities/Gates.entity';
import { FlightSeats } from 'src/flights/entities/FlightSeats.entity';
import { LuggageRepository } from 'src/luggage/repositories/luggage.repository';
import { CreateLuggageDto } from 'src/luggage/dto/create_luggage.dto';
import { RegisterTicketsRepository } from 'src/tickets/repositories/register_tickets.repository';
import { RegisterTicketDto } from 'src/tickets/dtos/register_ticket.dto';
import { FlightsRepository } from 'src/flights/repositories/flights.repository';
import { GetFlightsFilterDto } from 'src/flights/dtos/get-flight-filter.dto';
import { GatesRepository } from './repositories/gate.repository';
import { GetGatesFilterDto } from './dtos/get_gates_filter.dto';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { TicketsRepository } from 'src/tickets/repositories/tickets.repository';
import { FlightsSeatsRepository } from 'src/flights/repositories/flight_seats.repository';
import { UpdateLuggageDto } from 'src/luggage/dto/update_luggage.dto';
import { RegisteredTickets } from 'src/tickets/entities/RegisteredTickets.entity';
import { Flights } from 'src/flights/entities/Flights.entity';
import { WeatherService, WeatherReport } from 'src/weather-api/weather.service';
import { GetReportDto } from 'src/weather-api/dtos/get_report.dto';
import { UpdateRegisteredTicketDto } from 'src/tickets/dtos/update_registered.dto';
import { JwtPayload } from 'src/auth/jwt/jwt-payload.interface';
import { RemoveTicketDto } from 'src/tickets/dtos/remove_ticket.dto';
import {
  Registration,
  RegistrationStatus,
} from './entities/Registration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StartRegistrationDto } from './dtos/start_registration.dto';
import { CloseRegistrationDto } from './dtos/close_registration.dto';
import { SuggestionDto } from './dtos/suggestion.dto';
import { GetFreeGatesDto } from './dtos/get_free_gates.dto';
import { GetAvailableLuggageDto } from './dtos/get-available-luggage.dto';
import { Users } from 'src/users/entities/Users.entity';
import { MaxWeight } from 'src/flights/entities/MaxWeight.view.entity';
@Injectable()
export class GatesService {
  constructor(
    @InjectRepository(Registration)
    private registerRepo: Repository<Registration>,
    @InjectRepository(MaxWeight)
    private weightRepo: Repository<MaxWeight>,
    private gateRepo: GatesRepository,
    private flightsRepo: FlightsRepository,
    private ticketRepo: TicketsRepository,
    private luggageRepo: LuggageRepository,
    private registerTicketRepo: RegisterTicketsRepository,
    private passengerRepo: UsersRepository,
    private flightSeatsRepo: FlightsSeatsRepository,
    private weatherService: WeatherService,
  ) {}

  public async getGates(filter: GetGatesFilterDto): Promise<Gates[]> {
    return await this.gateRepo.getGates(filter);
  }

  public async getGate(gatedId: number): Promise<Gates> {
    return await this.gateRepo.getGate(gatedId);
  }

  public async getRegisteredTickets(
    gateId: number,
  ): Promise<RegisteredTickets[]> {
    const registered = await this.registerTicketRepo.find({
      where: { gate: { id: gateId } },
      relations: ['ticket', 'registeredBy', 'seat', 'luggage'],
    });

    return registered;
  }
  public async generateReport(gateId: number, reportTime: GetReportDto) {
    const filter = new GetFlightsFilterDto();
    const { from, to } = reportTime;
    filter.gateId = gateId;
    filter.scheduleTimeFrom = from;
    filter.scheduleTimeTo = to;

    const flights = await this.flightsRepo.getFlights(filter);
    const groups: Record<
      string,
      Record<
        string,
        ({ flight: Flights } & { shouldRearrange: boolean } & {
          weather: WeatherReport;
        })[]
      >
    > = {};

    for (const flight of flights) {
      const type = flight.flightType;

      const time = flight.scheduleTime;
      const dateKey = time.toISOString().split('T')[0];

      if (!groups[type]) groups[type] = {};
      if (!groups[type][dateKey]) groups[type][dateKey] = [];

      const weatherReport: WeatherReport =
        await this.weatherService.getWeatherReport(flight.scheduleTime);

      const shouldRearrange =
        this.weatherService.shouldRearangeFlight(weatherReport);

      groups[type][dateKey].push({
        flight: flight,
        weather: weatherReport,
        shouldRearrange,
      });
    }

    return groups;
  }

  public async getMaxLuggageWeight(dto: GetAvailableLuggageDto) {
    const { flightId } = dto;

    const flight = await this.flightsRepo.getFlight(flightId);

    const found = await this.weightRepo.findOne({
      where: { flight_id: flight.id },
    });

    if (!found) throw new Error('Error fetching from view');

    return found.max_weight;
  }

  public async getLuggagePassengers(
    gateId: number,
    dto: GetAvailableLuggageDto,
  ) {
    const { flightId } = dto;

    const flight = await this.flightsRepo.getFlight(flightId);

    const gate = await this.gateRepo.getGate(gateId);

    const tickets = await this.getRegisteredTickets(gate.id);

    const luggages = await this.luggageRepo.find();

    const filteredPassengers: Users[] = tickets
      .filter(
        (t) =>
          t.ticket.flight.id === flight.id &&
          !luggages.some((l) => l.ticket.id === t.ticket.id),
      )
      .map((t) => t.ticket.passenger);

    return filteredPassengers;
  }

  public async getSuggestion(gateId: number, suggestion: SuggestionDto) {
    const { from, hours } = suggestion;
    return this.weatherService.sugestRearange(from, hours);
  }

  public async getPassengers() {
    return this.passengerRepo.getPassengers();
  }

  public async startRegistration(
    gateId: string,
    startRegDto: StartRegistrationDto,
  ) {
    const { flightId, startedAt } = startRegDto;

    const flight = await this.flightsRepo.getFlight(flightId);

    const registration = this.registerRepo.create({
      flight,
      startedAt,
      registrationStatus: RegistrationStatus.Open,
    });

    return await this.registerRepo.save(registration);
  }

  public async closeRegistration(gateId: string, close: CloseRegistrationDto) {
    const { id, closedAt } = close;

    const registration = await this.registerRepo.findOne({
      where: { id },
    });

    if (!registration) throw new NotFoundException('Registration not found');

    registration.closedAt = closedAt;

    registration.registrationStatus = RegistrationStatus.Closed;

    return await this.registerRepo.save(registration);
  }

  public async getFreeGates(dto: GetFreeGatesDto): Promise<Gates[]> {
    const { date } = dto;
    return this.gateRepo.getFreeGates(date);
  }

  public async getFlightSeats(flightId: number): Promise<FlightSeats[]> {
    return await this.flightSeatsRepo.getSeats(flightId);
  }

  public async registerTicket(
    gateId,
    registerTicketDto: RegisterTicketDto,
    user: JwtPayload,
  ) {
    const { seatId, ticketId, passengerId } = registerTicketDto;

    const gate = await this.gateRepo.getGate(gateId);

    const registeredBy = await this.passengerRepo.getUser(user.email);

    const ticket = await this.ticketRepo.getTicket(ticketId);

    const seat = await this.flightSeatsRepo.getSeat(seatId);

    const passenger = await this.passengerRepo.getPassengerById(passengerId);

    const registeredTicket = this.registerTicketRepo.create({
      seat,
      registeredBy: registeredBy,
      registeredAt: new Date(),
      ticket,
      gate,
    });

    ticket.passenger = passenger;

    await this.ticketRepo.save(ticket);

    const registered = await this.registerTicketRepo.save(registeredTicket);

    return registered;
  }

  public async registerLuggage(luggageDto: CreateLuggageDto) {
    const { weight, status, passengerId, ticketId } = luggageDto;

    const registered = await this.registerTicketRepo.findOne({
      where: { id: ticketId },
    });

    if (!registered) {
      throw new NotFoundException('Ticket is not registered yet');
    }

    const passenger = await this.passengerRepo.getPassengerById(passengerId);

    const luggage = this.luggageRepo.create({
      weight,
      status,
      ticket: registered,
      passenger,
    });

    const registeredLuggage = await this.luggageRepo.save(luggage);

    return registeredLuggage;
  }

  public async updateLuggage(
    luggageId: number,
    updateLuggageDto: UpdateLuggageDto,
  ) {
    return await this.luggageRepo.updateLuggage(luggageId, updateLuggageDto);
  }

  public async updateRegisteredTicket(
    ticketId: number,
    updateTicket: UpdateRegisteredTicketDto,
    user: JwtPayload,
  ): Promise<RegisteredTickets> {
    const { seatId } = updateTicket;
    const registered = await this.registerTicketRepo.getTicket(ticketId);

    const seat = await this.flightSeatsRepo.getSeat(seatId);

    registered.seat = seat;
    registered.registeredAt = new Date();
    const terminalManager = await this.passengerRepo.getTerminalManager(user);
    registered.registeredBy = terminalManager;

    await this.registerTicketRepo.save<RegisteredTickets>(registered);

    return registered;
  }

  public async removeTicket(removeTicketDto: RemoveTicketDto) {
    const { ticketId } = removeTicketDto;
    return await this.registerTicketRepo.removeTicket(ticketId);
  }

  public async removeLuggage(luggageId: number) {
    return await this.luggageRepo.removeLuggage(luggageId);
  }
}
