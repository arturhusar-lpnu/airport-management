import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';

export class SuggestionDto {
  @IsDate()
  @Type(() => Date)
  from: Date;

  @IsNumber()
  @Type(() => Number)
  hours: number;
}
