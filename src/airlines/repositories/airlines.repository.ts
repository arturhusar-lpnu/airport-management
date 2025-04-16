import { Injectable, NotFoundException } from '@nestjs/common';
import { Airlines } from '../entities/Airlines.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AirlinesRepository extends Repository<Airlines> {
  constructor(private dataSource: DataSource) {
    super(Airlines, dataSource.createEntityManager());
  }

  public async getAirline(id: number): Promise<Airlines> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`No such airline with id : ${id} found`);
    }

    return found;
  }
}
