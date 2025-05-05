import { Injectable } from '@nestjs/common';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { GateWorkload } from './entities/GateWorkloads.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthlyFlightStats } from './entities/MonthlyFlightStats.entity';
import { GetWorkloadsDto } from './dtos/get-workloads.dto';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(GateWorkload)
    private gatesWorkloadRepo: Repository<GateWorkload>,
    @InjectRepository(MonthlyFlightStats)
    private monthlyFlights: Repository<MonthlyFlightStats>,
  ) {}

  public async getWorkloads(dto: GetWorkloadsDto) {
    const { date } = dto;
    const options = date
      ? {
          where: {
            date: MoreThanOrEqual(date),
          },
        }
      : {};

    return this.gatesWorkloadRepo.find(options);
  }

  public async getWorkload(dto: GetWorkloadsDto) {
    const { gateId, date } = dto;

    if (!gateId) throw new Error('Provide gateId');

    if (!date) throw new Error('Provide a Date');

    const found = await this.gatesWorkloadRepo.findOne({
      where: { gateId, date },
    });

    if (!found) throw new Error('Gate Workload not Found');

    return found;
  }
}
