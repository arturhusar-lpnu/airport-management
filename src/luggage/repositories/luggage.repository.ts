import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Luggages } from '../entities/Luggages.entity';
import { GetLuggagesFilterDto } from '../dto/get_luggages.dto';
import { UpdateLuggageDto } from '../dto/update_luggage.dto';

@Injectable()
export class LuggageRepository extends Repository<Luggages> {
  constructor(private dataSource: DataSource) {
    super(Luggages, dataSource.createEntityManager());
  }

  public async updateLuggage(
    luggageId: number,
    updateDto: UpdateLuggageDto,
  ): Promise<Luggages> {
    const luggage = await this.getLuggage(luggageId);
    const { status, weight } = updateDto;

    const updateObj: Partial<Luggages> = {};

    if (status !== undefined) updateObj.status = status;
    if (weight !== undefined) updateObj.weight = weight;

    if (Object.keys(updateObj).length > 0) {
      Object.assign(luggage, updateObj);
      await this.save(luggage);
    }

    return luggage;
  }

  public async getLuggage(id: number) {
    const found = await this.findOne({ where: { id } });

    if (!found)
      throw new NotFoundException(`Luggage with id : ${id} not found`);

    return found;
  }

  public async removeLuggage(id: number) {
    const res = await this.delete(id);

    if (res.affected == 0) {
      throw new NotFoundException(`Luggage with id : ${id} not found`);
    }
  }

  public async getLuggages(
    filterDto: GetLuggagesFilterDto,
  ): Promise<Luggages[]> {
    const { weight, status, passengerId, ticketId } = filterDto;
    const query = this.createQueryBuilder('luggages');

    if (weight) {
      query.andWhere('luggages.weight = :weight', { weight });
    }

    if (status) {
      query.andWhere('luggages.status = :status', { status });
    }

    if (passengerId) {
      query.andWhere('luggages.passenger_id = :passengerId', { passengerId });
    }
    if (ticketId) {
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
