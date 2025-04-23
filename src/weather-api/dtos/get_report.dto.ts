import { IsDate } from 'class-validator';

export class GetReportDto {
  @IsDate()
  from: Date;

  @IsDate()
  to: Date;
}
