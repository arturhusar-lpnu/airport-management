import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { GetWorkloadsDto } from './dtos/get-workloads.dto';
import { GateWorkload } from './entities/GateWorkloads.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/users/roles.guard';
import { Roles } from 'src/users/roles.decorator';
import { UserRoles } from 'src/users/user_role.enum';
import { GetTopRoutesDto } from './dtos/get-top-routes.dto';

@Controller('stats')
@UseGuards(AuthModule, RolesGuard)
@Roles(UserRoles.Admin)
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('/gates/workloads')
  public async getWorkloads(
    @Query() dto: GetWorkloadsDto,
  ): Promise<GateWorkload[]> {
    return this.statsService.getWorkloads(dto);
  }

  @Get('/top-routes')
  public async getTopRoutes(dto: GetTopRoutesDto) {
    return this.statsService.getTopRoutes(dto);
  }

  @Get('/active-users')
  public async getActiveUsers() {
    return this.statsService.getActiveUsers();
  }

  @Get('/luggages-per-month')
  public async getLuggagesPerMonth() {
    return this.statsService.getLuggagesPerMonth();
  }

  @Get('/top-airports')
  public async getTopAirports() {
    return this.statsService.getTopAirports();
  }

  @Get('/top-buyings')
  public async getTopBuyings() {
    return this.statsService.getTopBuyings();
  }

  @Get('/monthly-flight-status')
  public async getMonthlyFlightsStats() {
    return this.statsService.getMonthlyFlightsStats();
  }
}
