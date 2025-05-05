import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class CloseRegistrationDto {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsDate()
  @Type(() => Date)
  closedAt: Date;
}
