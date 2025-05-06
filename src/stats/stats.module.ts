import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyFlightStats } from './entities/MonthlyFlightStats.entity';
import { GateWorkload } from './entities/GateWorkloads.entity';
import { LuggagePerMonth } from './entities/LuggagePerMonth.view.entity';
import { MostPopularArrivingRoutes } from './entities/MostPopularArrivingRoutes.view.entity';
import { MostPopularDepartingRoutes } from './entities/MostPopularDepartingRoutes.view.entity';
import { ActiveUsersByRole } from './entities/ActiveUsersByRole.view.entity';
import { TopBuyingDays } from './entities/TopBuying.view.entity';
import { TopAirports } from './entities/TopAirports.view.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      MonthlyFlightStats,
      GateWorkload,
      LuggagePerMonth,
      MostPopularArrivingRoutes,
      MostPopularDepartingRoutes,
      ActiveUsersByRole,
      TopBuyingDays,
      TopAirports,
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
