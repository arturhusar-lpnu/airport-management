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
        gateNumber: `%${gateNumber}%`,
      });
    }

    query.leftJoinAndSelect('gates.terminal', 'terminals');
    return await query.getMany();
  }

  public async getFreeGates(date: Date): Promise<Gates[]> {
    const gates = await this.find({ relations: ['flights'] });
    return gates.filter((g) =>
      g.flights.every((f) => !this.isSameHour(f.scheduleTime, date)),
    );
  }

  private isSameHour(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate() &&
      d1.getHours() === d2.getHours()
    );
  }

  public async getGate(id: number): Promise<Gates> {
    const found = await this.findOne({ where: { id } });

    if (!found) throw new NotFoundException(`Gate with id ${id} was not found`);

    return found;
  }
}
