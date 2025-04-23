import { Injectable, NotFoundException } from '@nestjs/common';
import { ArrayContains, DataSource, Repository } from 'typeorm';
import { FlightSeats } from '../entities/FlightSeats.entity';

@Injectable()
export class FlightsSeatsRepository extends Repository<FlightSeats> {
  constructor(private dataSource: DataSource) {
    super(FlightSeats, dataSource.createEntityManager());
  }

  public async getSeat(seatId: number): Promise<FlightSeats> {
    const found = await this.findOne({ where: { id: seatId } });

    if (!found) {
      throw new NotFoundException(`Seat id: ${seatId} is not found`);
    }

    return found;
  }

  public async getSeats(flightId: number) {
    const seats = await this.find({ where: { flight: { id: flightId } } });

    return seats;
  }
}
