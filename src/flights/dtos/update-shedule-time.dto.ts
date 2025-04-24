import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class UpdateSheduleTimeDto {
  @IsDate()
  @Type(() => Date)
  newScheduleTime: Date;
}
