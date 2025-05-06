import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetAvailableLuggageDto {
  @IsNumber()
  @Type(() => Number)
  flightId: number;
}
