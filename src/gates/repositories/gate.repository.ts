import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Gates } from '../entities/Gates.entity';
import { GetGatesFilterDto } from '../dtos/get_gates_filter.dto';

@Injectable()
export class GatesRepository extends Repository<Gates> {
  constructor(private dataSource: DataSource) {
    super(Gates, dataSource.createEntityManager());
  }

  public async getGates(filter: GetGatesFilterDto): Promise<Gates[]> {
    const query = this.createQueryBuilder('gates');
    const { gateNumber } = filter;

    if (gateNumber) {
      query.andWhere('LOWER(gates.gate_number) LIKE LOWER(:gateNumber)', {
        gateNumber,
      });
    }

    return await query.getMany();
  }

  public async getGate(id: number): Promise<Gates> {
    const found = await this.findOne({ where: { id } });

    if (!found) throw new NotFoundException(`Gate with id ${id} was not found`);

    return found;
  }
}
