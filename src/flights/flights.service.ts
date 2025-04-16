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
@Injectable()
export class FlightsService {
  constructor(
    private flightsRepo: FlightsRepository,
    private airlineRepo: AirlinesRepository,
    private aircraftRepo: AircraftsRepository,
  ) {}

  public async getFlights(filterDto: GetFlightsFilterDto): Promise<Flights[]> {
    return await this.flightsRepo.getFlights(filterDto);
  }

  public async createFlight(
    createFlightDto: CreateFlightDto,
  ): Promise<Flights> {
    const { status, type, scheduleTime, flightName, aircraftId, airlineId } =
      createFlightDto;

    const airline = await this.airlineRepo.getAirline(airlineId);
    if (!airline) throw new NotFoundException('Airline not found');

    const aircraft = await this.aircraftRepo.getAircraft(aircraftId);
    if (!aircraft) throw new NotFoundException('Aircraft not found');

    const flight = this.flightsRepo.create({
      flightName,
      status,
      flightType: type,
      scheduleTime,
      aircraft,
      airline,
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
