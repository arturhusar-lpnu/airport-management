import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { GetUser } from 'src/users/get-user.decorator';
import { CreateTicketDto } from './dtos/create_ticket.dto';
import { Tickets } from './entities/Tickets.entity';
import { Roles } from 'src/users/roles.decorator';
import { UserRoles } from 'src/users/user_role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/users/roles.guard';

@Controller('tickets')
@UseGuards(AuthGuard(), RolesGuard)
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post('/buy-ticket')
  @Roles(UserRoles.Passenger)
  public async buyTicket(
    @Body() newTickets: CreateTicketDto[],
    @GetUser() user,
  ): Promise<Tickets[]> {
    return this.ticketService.buyTicket(newTickets, user);
  }

  @Get()
  public async getTickets() {
    return this.ticketService.getTickets();
  }

  @Get('/details/available')
  public async getAvailableFlights() {
    return this.ticketService.getAvailableFlights();
  }

  @Get('/ticket/:id')
  public async getTicket(@Param('id') id: number) {
    return this.ticketService.getTicket(id);
  }
}
