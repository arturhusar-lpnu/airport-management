import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class RemoveTicketDto {
  @IsNumber()
  @Type(() => Number)
  ticketId: number;
}
