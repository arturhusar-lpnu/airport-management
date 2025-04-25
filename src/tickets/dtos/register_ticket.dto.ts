import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class RegisterTicketDto {
  @IsNumber()
  @Type(() => Number)
  seatId: number;

  @IsNumber()
  @Type(() => Number)
  ticketId: number;
}
