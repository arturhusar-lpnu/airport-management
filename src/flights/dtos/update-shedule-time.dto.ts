import { IsDate } from 'class-validator';

export class UpdateSheduleTimeDto {
  @IsDate()
  newScheduleTime: Date;
}
