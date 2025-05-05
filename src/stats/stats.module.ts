import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyFlightStats } from './entities/MonthlyFlightStats.entity';
import { GateWorkload } from './entities/GateWorkloads.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([MonthlyFlightStats, GateWorkload]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
