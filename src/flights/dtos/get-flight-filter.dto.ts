import {
  IsOptional,
  IsEnum,
  IsString,
  IsDate,
  IsNumber,
} from 'class-validator';
import { FlightType } from '../enums/flight-type.enum';
import { FlightStatus } from '../enums/flight_status.enum';

export class GetFlightsFilterDto {
  @IsOptional()
  @IsEnum(FlightType)
  type?: FlightType;

  @IsOptional()
  @IsEnum(FlightStatus)
  status?: FlightStatus;

  @IsOptional()
  @IsString()
  searchName?: string;

  @IsOptional()
  @IsDate()
  scheduleTimeFrom?: Date;

  @IsOptional()
  @IsDate()
  scheduleTimeTo?: Date;

  @IsOptional()
  @IsNumber()
  gateId?: number;
}
