import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Gates } from '../entities/Gates.entity';

@Injectable()
export class GatesRepository extends Repository<Gates> {
  constructor(private dataSource: DataSource) {
    super(Gates, dataSource.createEntityManager());
  }

  public async getGates() {
    return await this.find();
  }

  public async getGate(id: number): Promise<Gates> {
    const found = await this.findOne({ where: { id } });

    if (!found) throw new NotFoundException(`Gate with id ${id} was not found`);

    return found;
  }
}
