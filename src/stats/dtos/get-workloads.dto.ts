import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetWorkloadsDto {
  @IsNumber()
  @Type(() => Number)
  gateId?: number;

  @IsString()
  @IsNotEmpty()
  date: string;
}
