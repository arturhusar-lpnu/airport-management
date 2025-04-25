import { LuggageStatus } from '../enums/luggage_status.enum';
import { IsNumberString, IsEnum, IsNumber, Matches } from 'class-validator';

export class CreateLuggageDto {
  @IsNumberString()
  @Matches(/^\d{1,3}(\.\d{1,2})?$/, {
    message:
      'weight must be a numeric string with up to 5 digits total and 2 decimal places',
  })
  weight: string;

  @IsEnum(LuggageStatus)
  status: LuggageStatus;

  @IsNumber()
  passengerId: number;

  @IsNumber()
  ticketId: number;
}
