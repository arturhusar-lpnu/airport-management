import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetWorkloadsDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  gateId?: number;

  @IsString()
  @IsOptional()
  date?: string;
}
