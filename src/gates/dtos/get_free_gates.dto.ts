import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetFreeGatesDto {
  @IsDate()
  @Type(() => Date)
  date: Date;
}
