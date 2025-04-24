import {
  IsDate,
  IsEnum,
  IsNumber,
  IsNumberString,
  Matches,
} from 'class-validator';
import { SeatClass } from '../enums/seat_class.enum';

export class CreateTicketDto {
  @IsNumberString()
  @Matches(/^\d{1,4}(\.\d{1,2})?$/, {
    message:
      'price must be a numeric string with up to 6 digits total and 2 decimal places',
  })
  price: string;

  @IsEnum(SeatClass)
  seatClass: SeatClass;

  @IsNumber()
  flightId: number;
}
