import { Injectable } from '@nestjs/common';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { GateWorkload } from './entities/GateWorkloads.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthlyFlightStats } from './entities/MonthlyFlightStats.entity';
import { GetWorkloadsDto } from './dtos/get-workloads.dto';
import { GetTopRoutesDto } from './dtos/get-top-routes.dto';
import { FlightType } from 'src/flights/enums/flight-type.enum';
import { MostPopularArrivingRoutes } from './entities/MostPopularArrivingRoutes.view.entity';
import { MostPopularDepartingRoutes } from './entities/MostPopularDepartingRoutes.view.entity';
import { LuggagePerMonth } from './entities/LuggagePerMonth.view.entity';
import { ActiveUsersByRole } from './entities/ActiveUsersByRole.view.entity';
import { TopAirports } from './entities/TopAirports.view.entity';
import { TopBuyingDays } from './entities/TopBuying.view.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(GateWorkload)
    private gatesWorkloadRepo: Repository<GateWorkload>,
    @InjectRepository(MonthlyFlightStats)
    private monthlyFlights: Repository<MonthlyFlightStats>,
    @InjectRepository(MostPopularArrivingRoutes)
    private topArrivingRepo: Repository<MostPopularArrivingRoutes>,
    @InjectRepository(MostPopularDepartingRoutes)
    private topDepartingRepo: Repository<MostPopularDepartingRoutes>,
    @InjectRepository(LuggagePerMonth)
    private luggageStatsRepo: Repository<LuggagePerMonth>,
    @InjectRepository(ActiveUsersByRole)
    private activeUsersRepo: Repository<ActiveUsersByRole>,
    @InjectRepository(TopAirports)
    private topAirportsRepo: Repository<TopAirports>,
    @InjectRepository(TopBuyingDays)
    private topBuyingsRepo: Repository<TopBuyingDays>,
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

  public async getTopRoutes(dto: GetTopRoutesDto) {
    const { type } = dto;

    if (type == FlightType.Arriving) return this.topArrivingRepo.find();

    if (type == FlightType.Departing) return this.topDepartingRepo.find();
  }

  public async getActiveUsers() {
    return this.activeUsersRepo.find();
  }

  public async getLuggagesPerMonth() {
    return this.luggageStatsRepo.find();
  }

  public async getTopAirports() {
    return this.topAirportsRepo.find();
  }

  public async getTopBuyings() {
    return this.topBuyingsRepo.find();
  }

  public async getMonthlyFlightsStats() {
    return this.monthlyFlights.find();
  }
}
