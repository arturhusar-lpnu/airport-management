import { IsNumber } from 'class-validator';

export class UpdateRegisteredTicketDto {
  @IsNumber()
  seatId: number;
}
