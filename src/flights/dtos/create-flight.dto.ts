import {
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { FlightStatus } from '../enums/flight_status.enum';
import { FlightType } from '../enums/flight-type.enum';
import { Type } from 'class-transformer';

export class CreateFlightDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  flightName: string;

  @IsEnum(FlightStatus)
  status: FlightStatus;

  @IsEnum(FlightType)
  type: FlightType;

  @IsDate()
  @Type(() => Date)
  scheduleTime: Date;

  @IsNumber()
  aircraftId: number;

  @IsNumber()
  airlineId: number;

  @IsNumber()
  airportId: number;

  @IsNumber()
  gateId: number;
}
