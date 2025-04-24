import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { FlightsRepository } from './repositories/flights.repository';
import { Flights } from './entities/Flights.entity';
import { Aircrafts } from 'src/airlines/entities/Aircrafts.entity';
import { Airlines } from 'src/airlines/entities/Airlines.entity';
import { AircraftsRepository } from 'src/airlines/repositories/aircrafts.repository';
import { AirlinesRepository } from 'src/airlines/repositories/airlines.repository';
import { AuthModule } from 'src/auth/auth.module';
import { Gates } from 'src/gates/entities/Gates.entity';
@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Flights, Airlines, Aircrafts, Gates]),
  ],
  providers: [
    FlightsService,
    FlightsRepository,
    AircraftsRepository,
    AirlinesRepository,
  ],
  controllers: [FlightsController],
})
export class FlightsModule {}
