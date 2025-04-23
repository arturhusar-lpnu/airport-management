import { LuggageStatus } from '../enums/luggage_status.enum';
import { IsOptional, IsEnum, IsNumberString, Matches } from 'class-validator';

export class UpdateLuggageDto {
  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,3}(\.\d{1,2})?$/, {
    message:
      'weight must be a numeric string with up to 5 digits total and 2 decimal places',
  })
  weight?: string;

  @IsOptional()
  @IsEnum(LuggageStatus)
  status?: LuggageStatus;
}
