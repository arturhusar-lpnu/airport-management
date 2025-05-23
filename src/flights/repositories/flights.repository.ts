import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Flights, flightRelations } from 'src/flights/entities/Flights.entity';
import { FlightStatus } from '../enums/flight_status.enum';
import { GetFlightsFilterDto } from '../dtos/get-flight-filter.dto';
import { CreateFlightDto } from '../dtos/create-flight.dto';

@Injectable()
export class FlightsRepository extends Repository<Flights> {
  constructor(private dataSource: DataSource) {
    super(Flights, dataSource.createEntityManager());
  }

  public async getFlights(filterDto: GetFlightsFilterDto): Promise<Flights[]> {
    const {
      status,
      type,
      searchName,
      scheduleTimeFrom,
      scheduleTimeTo,
      gateId,
    } = filterDto;

    const query = this.createQueryBuilder('flights');
    if (status) {
      query.andWhere('flights.status = :status', { status });
    }

    if (type) {
      query.andWhere('flights.flight_type = :type', { type });
    }

    if (scheduleTimeFrom) {
      query.andWhere('flights.schedule_time >= :scheduleTimeFrom', {
        scheduleTimeFrom,
      });
    }

    if (scheduleTimeTo) {
      query.andWhere('flights.schedule_time <= :scheduleTimeTo', {
        scheduleTimeTo,
      });
    }

    if (searchName) {
      query.andWhere('LOWER(flights.flight_name) LIKE LOWER(:searchName)', {
        searchName: `%${searchName}%`,
      });
    }

    if (gateId) {
      query.andWhere('flights.gate_id = :gateId', { gateId });
    }

    try {
      for (const relation of flightRelations) {
        query.leftJoinAndSelect(`flights.${relation}`, relation);
      }
      // query.leftJoinAndSelect('flights.gate', 'gate');
      query.leftJoinAndSelect('gate.terminal', 'terminals');
      query.leftJoinAndSelect('tickets.passenger', 'users');
      query.orderBy('flights.schedule_time', 'ASC');
      const flights = await query.getMany();
      return flights;
    } catch (error) {
      console.error(
        `Failed to get flights. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  public async getFlight(id: number): Promise<Flights> {
    const query = this.createQueryBuilder('flights');
    for (const relation of flightRelations) {
      query.leftJoinAndSelect(`flights.${relation}`, relation);
    }
    // query.leftJoinAndSelect('flights.gate', 'gate');
    query.leftJoinAndSelect('aircraft.model', 'aircraft_models');

    query.leftJoinAndSelect('gate.terminal', 'terminals');
    query.leftJoinAndSelect('tickets.passenger', 'users');

    query.where('flights.id = :id', { id });

    query.orderBy('flights.schedule_time', 'ASC');

    const found = await query.getOne();

    if (!found) {
      throw new NotFoundException(`No such flight with id : ${id} found`);
    }

    return found;
  }
  public async updateStatus(
    id: number,
    status: FlightStatus,
  ): Promise<Flights> {
    const flight = await this.getFlight(id);
    flight.status = status;

    await this.save(flight);

    return flight;
  }

  public async updateScheduleTime(id: number, newTime: Date): Promise<Flights> {
    const flight = await this.getFlight(id);
    flight.scheduleTime = newTime;

    await this.save(flight);

    return flight;
  }

  public async removeFlight(id: number): Promise<void> {
    const result = await this.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`No such flight with id : ${id} found`);
    }
  }
}
