import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tickets } from '../entities/Tickets.entity';

@Injectable()
export class TicketsRepository extends Repository<Tickets> {
  constructor(private dataSource: DataSource) {
    super(Tickets, dataSource.createEntityManager());
  }

  public async getTicket(ticketId: number): Promise<Tickets> {
    const found = await this.findOne({ where: { id: ticketId } });

    if (!found) {
      throw new NotFoundException(`Ticket with id : ${ticketId} is not found`);
    }

    return found;
  }
}
