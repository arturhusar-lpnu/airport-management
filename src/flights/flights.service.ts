import { Injectable } from '@nestjs/common';
import { FlightsRepository } from './repositories/flights.repository';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { GetFlightsFilterDto } from './dtos/get-flight-filter.dto';
import { Flights } from './entities/Flights.entity';
import { UpdateFlighStatustDto } from './dtos/update-flight-status.dto';
import { UpdateSheduleTimeDto } from './dtos/update-shedule-time.dto';
import { AirlinesRepository } from 'src/airlines/repositories/airlines.repository';
import { AircraftsRepository } from 'src/airlines/repositories/aircrafts.repository';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gates } from 'src/gates/entities/Gates.entity';
import { Airports } from './entities/Airports.entity';
import { SeatAvailability } from './entities/SeatsAvailability.view.entity';
import { UpdateFlighGateDto } from './dtos/update-flight-gate.dto';
import { AppDataSource } from 'src/db/data-source/data-source';
@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Gates)
    private gatesRepo: Repository<Gates>,
    @InjectRepository(Airports)
    private airportRepo: Repository<Airports>,
    @InjectRepository(SeatAvailability)
    private seatViewRepo: Repository<SeatAvailability>,
    private flightsRepo: FlightsRepository,
    private airlineRepo: AirlinesRepository,
    private aircraftRepo: AircraftsRepository,
  ) {}

  public async getFlights(filterDto: GetFlightsFilterDto): Promise<Flights[]> {
    return await this.flightsRepo.getFlights(filterDto);
  }

  public async getFlight(id: number): Promise<Flights> {
    return this.flightsRepo.getFlight(id);
  }

  public async getPrices(id: number) {
    const flight = await this.getFlight(id);

    return flight.flightPrices;
  }

  public async updateFlightGate(
    id: number,
    updateFlightGateDto: UpdateFlighGateDto,
  ) {
    const flight = await this.getFlight(id);

    const { gateId } = updateFlightGateDto;

    const gate = await this.gatesRepo.findOne({ where: { id: gateId } });

    if (!gate) throw new NotFoundException('Gate not found');

    await AppDataSource.transaction(async (manager) => {
      flight.gate = gate;
      await manager.save(flight);
      const scheduleDate = new Date(flight.scheduleTime)
        .toISOString()
        .split('T')[0];
      await manager.query('CALL update_gate_workloads($1);', [scheduleDate]);
    });

    return flight;
  }

  public async getSeats(id: number) {
    const flight = await this.getFlight(id);

    return this.seatViewRepo.find({
      where: {
        //is_taken: false,
        flight_id: flight.id,
      },
    });
  }

  public async createFlight(
    createFlightDto: CreateFlightDto,
  ): Promise<Flights> {
    const {
      status,
      type,
      scheduleTime,
      flightName,
      aircraftId,
      airlineId,
      airportId,
      gateId,
    } = createFlightDto;

    const airline = await this.airlineRepo.getAirline(airlineId);
    if (!airline) throw new NotFoundException('Airline not found');

    const aircraft = await this.aircraftRepo.getAircraft(aircraftId);
    if (!aircraft) throw new NotFoundException('Aircraft not found');

    const gate = await this.gatesRepo.findOne({ where: { id: gateId } });

    if (!gate) throw new NotFoundException('Gate not found');

    const airport = await this.airportRepo.findOne({
      where: { id: airportId },
    });

    if (!airport) throw new NotFoundException('Airport not found');

    const flight = this.flightsRepo.create({
      flightName,
      status,
      flightType: type,
      scheduleTime,
      aircraft,
      airline,
      airport,
      gate,
    });

    return await this.flightsRepo.save(flight);
  }

  public async updateFlightStatus(
    id: number,
    updateStatusDto: UpdateFlighStatustDto,
  ): Promise<Flights> {
    return await this.flightsRepo.updateStatus(id, updateStatusDto.status);
  }

  public async updateFlightSheduleTime(
    id: number,
    updateTimeDto: UpdateSheduleTimeDto,
  ): Promise<Flights> {
    return await this.flightsRepo.updateScheduleTime(
      id,
      updateTimeDto.newScheduleTime,
    );
  }

  public async deleteFlight(id: number): Promise<void> {
    return this.flightsRepo.removeFlight(id);
  }
}
