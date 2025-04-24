import { IsEnum, IsOptional } from 'class-validator';
import { SeatClass } from '../enums/seat_class.enum';

export class GetFilteredTicketsDto {
  @IsOptional()
  @IsEnum(SeatClass)
  seatClass?: SeatClass;
}
