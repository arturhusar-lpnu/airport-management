import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  Body,
} from '@nestjs/common';
import { GatesService } from './gates.service';
import { Gates } from './entities/Gates.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/users/roles.guard';
import { UserRoles } from 'src/users/user_role.enum';
import { Roles } from 'src/users/roles.decorator';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('gates')
export class GatesController {
  constructor(private gatesService: GatesService) {}

  @Get()
  public async getGates(@Body() filterDto: GatesFilterDto): Promise<Gates[]> {
    return this.gatesService.getFilteredGates(filterDto);
  }

  @Get('/:id')
  public async getGateById(@Param('id') gatedId: number): Promise<Gates> {
    return this.gatesService.getGate(gatedId);
  }

  @Get('/:id/report')
  public async getGateReport(@Param('id') gateId: number): Promise<ReportDto> {
    return this.gatesService.generateReport(gateId);
  }

  @Post('/add-gate')
  @Roles(UserRoles.Admin)
  public async addGate(@Body() createGateDto: CreateGateDto): Promise<Gates> {
    return this.gatesService.addGate(createGateDto);
  }

  @Post('/:id/assign-new-manager')
  @Roles(UserRoles.Admin)
  public async assignGateManager(
    @Param('id') id: number,
    @Body() gateManagerDto: GateManagerDto,
  ): Promise<void> {
    return this.gatesService.assignGateManager(id, gateManagerDto);
  }

  @Post('/:id/register-ticket/')
  @Roles(UserRoles.TerminalManager)
  public async registerPassengerTicket(
    @Param('id') id: number,
    @Body() ticketDto: TicketDto,
    @Body() passengerId: string,
  ) {
    return this.gatesService.regisetTicket(id, passengerId, ticketDto);
  }

  @Post('/:gateId/registered-ticket/:ticketId/register-luggage')
  @Roles(UserRoles.TerminalManager)
  public async registerLuggage(
    @Param('gateId') gateId: number,
    @Param('ticketId') ticketId: number,
    @Body() luggageDto: LuggageDto,
  ) {
    return this.gatesService.registerLuggage(gateId, ticketId, luggageDto);
  }

  @Put('/:gateId/registered-luggage/:luggageId/update-luggage')
  @Roles(UserRoles.TerminalManager)
  public async updateLuggage(
    @Param('gateId') gateId: number,
    @Param('luggageId') luggageId: number,
    @Body() updateLuggageDto: UpdateLuggageDto,
  ) {
    return this.gatesService.updateLuggage(gateId, luggageId, updateLuggageDto); // maybe change to LuggageService later
  }

  @Put('/:gateId/registered-ticket/:ticketId/update-ticket')
  @Roles(UserRoles.TerminalManager)
  public async updateTicket(
    @Param('gateId') gateId: number,
    @Param('ticketId') ticketId: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.gatesService.updateTicket(gateId, ticketId, updateTicketDto);
  }

  @Delete('/:gateId/registered-ticket/:ticketId/remove-ticket')
  @Roles(UserRoles.TerminalManager)
  public async removeTicket(
    @Param('gateId') gateId: number,
    @Param('ticketId') ticketId: number,
  ) {
    return this.gatesService.removeTicket(gateId, ticketId);
  }

  @Delete('/:gateId/registered-luggage/:luggageId/remove-luggage')
  @Roles(UserRoles.TerminalManager)
  public async removeLuggage(
    @Param('gateId') gateId: number,
    @Param('luggageId') luggageId: number,
  ) {
    return this.gatesService.removeLuggage(gateId, luggageId);
  }
}
