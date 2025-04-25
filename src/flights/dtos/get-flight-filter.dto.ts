import {
  IsOptional,
  IsEnum,
  IsString,
  IsDate,
  IsNumber,
} from 'class-validator';
import { FlightType } from '../enums/flight-type.enum';
import { FlightStatus } from '../enums/flight_status.enum';
import { Type } from 'class-transformer';

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
  @Type(() => Date)
  scheduleTimeFrom?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  scheduleTimeTo?: Date;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  gateId?: number;
}
