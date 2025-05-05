import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { GetWorkloadsDto } from './dtos/get-workloads.dto';
import { GateWorkload } from './entities/GateWorkloads.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RolesGuard } from 'src/users/roles.guard';
import { Roles } from 'src/users/roles.decorator';
import { UserRoles } from 'src/users/user_role.enum';

@Controller('stats')
@UseGuards(AuthModule, RolesGuard)
export class StatsController {
  constructor(private statsService: StatsService) {}

  @Get('/gates/workloads')
  @Roles(UserRoles.Admin)
  public async getWorkloads(
    @Query() dto: GetWorkloadsDto,
  ): Promise<GateWorkload[]> {
    return this.statsService.getWorkloads(dto);
  }
}
