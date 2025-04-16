import { Injectable, NotFoundException } from '@nestjs/common';
import { Aircrafts } from '../entities/Aircrafts.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AircraftsRepository extends Repository<Aircrafts> {
  constructor(private dataSource: DataSource) {
    super(Aircrafts, dataSource.createEntityManager());
  }

  public async getAircraft(id: number): Promise<Aircrafts> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`No such aircraft with id : ${id} found`);
    }

    return found;
  }
}
