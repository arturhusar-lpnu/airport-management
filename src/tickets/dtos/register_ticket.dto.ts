import { IsNumber } from 'class-validator';

export class RegisterTicketDto {
  @IsNumber()
  seatId: number;

  @IsNumber()
  ticketId: number;
}
