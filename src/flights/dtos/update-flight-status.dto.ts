import { IsEnum, IsOptional } from 'class-validator';
import { FlightStatus } from '../enums/flight_status.enum';

export class UpdateFlighStatustDto {
  @IsEnum(FlightStatus)
  status: FlightStatus;
}
