import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdateFlighGateDto {
  @IsNumber()
  @Type(() => Number)
  gateId: number;
}
