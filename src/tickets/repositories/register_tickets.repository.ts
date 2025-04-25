import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { RegisteredTickets } from '../entities/RegisteredTickets.entity';
import { Tickets } from '../entities/Tickets.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class RegisterTicketsRepository extends Repository<RegisteredTickets> {
  constructor(private dataSource: DataSource) {
    super(RegisteredTickets, dataSource.createEntityManager());
  }

  public async getTickets() {}

  public async getTicket(ticketId: number) {
    const found = await this.findOne({ where: { ticket: { id: ticketId } } });

    if (!found) {
      throw new NotFoundException(`Ticket is not registered`);
    }

    return found;
  }

  public async removeTicket(ticketId: number) {
    try {
      const res = await this.delete({ id: ticketId });

      if (res.affected === 0) {
        throw new NotFoundException('Ticket not found or not registered');
      }
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as any).code === '23503'
      ) {
        throw new BadRequestException(
          'Cannot delete ticket: it is referenced in other records.',
        );
      }

      throw error; // rethrow unhandled errors
    }
  }
}
