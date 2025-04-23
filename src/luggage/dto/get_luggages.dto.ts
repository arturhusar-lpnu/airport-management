import { LuggageStatus } from '../enums/luggage_status.enum';
import {
  IsOptional,
  IsEnum,
  IsNumber,
  IsNumberString,
  Matches,
} from 'class-validator';

export class GetLuggagesFilterDto {
  @IsOptional()
  @IsNumber()
  id?: number;

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

  @IsOptional()
  @IsNumber()
  passengerId?: number;

  @IsOptional()
  @IsNumber()
  ticketId?: number;
}
