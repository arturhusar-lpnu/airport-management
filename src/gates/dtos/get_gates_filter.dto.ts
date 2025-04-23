import { IsOptional, IsString } from 'class-validator';

export class GetGatesFilterDto {
  @IsOptional()
  @IsString()
  gateNumber?: string;
}
