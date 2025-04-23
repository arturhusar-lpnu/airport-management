import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Luggages } from '../entities/Luggages.entity';
import { GetLuggagesFilterDto } from '../dto/get_luggages.dto';

@Injectable()
export class LuggageRepository extends Repository<Luggages> {
  constructor(private dataSource: DataSource) {
    super(Luggages, dataSource.createEntityManager());
  }

  public async getLuggages(
    filterDto: GetLuggagesFilterDto,
  ): Promise<Luggages[]> {
    const { id, weight, status, passengerId, ticketId } = filterDto;
    const query = this.createQueryBuilder('luggages');
    if (id) {
      query.andWhere('luggages.id = :id', { id });
    }

    if (id) {
      query.andWhere('luggages.weight = :weight', { weight });
    }

    if (id) {
      query.andWhere('luggages.status = :status', { status });
    }

    if (id) {
      query.andWhere('luggages.passenger_id = :passengerId', { passengerId });
    }
    if (id) {
      query.andWhere('luggages.ticket_id = :ticketId', { ticketId });
    }
    try {
      const luggages = await query.getMany();
      return luggages;
    } catch (error) {
      console.error(
        `Failed to get flights. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
