import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class StartRegistrationDto {
  @IsNumber()
  @Type(() => Number)
  flightId: number;

  @IsDate()
  @Type(() => Date)
  startedAt: Date;
}
