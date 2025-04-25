import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  Body,
  Query,
} from '@nestjs/common';
import { GatesService } from './gates.service';
import { Gates } from './entities/Gates.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/users/roles.guard';
import { UserRoles } from 'src/users/user_role.enum';
import { Roles } from 'src/users/roles.decorator';
import { GetUser } from 'src/users/get-user.decorator';
import { RegisterTicketDto } from 'src/tickets/dtos/register_ticket.dto';
import { CreateLuggageDto } from 'src/luggage/dto/create_luggage.dto';
import { Users } from 'src/users/entities/Users.entity';
import { GetGatesFilterDto } from './dtos/get_gates_filter.dto';
import { UpdateLuggageDto } from 'src/luggage/dto/update_luggage.dto';
import { GetReportDto } from 'src/weather-api/dtos/get_report.dto';
import { UpdateRegisteredTicketDto } from 'src/tickets/dtos/update_registered.dto';
import { JwtPayload } from 'src/auth/jwt/jwt-payload.interface';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('gates')
export class GatesController {
  constructor(private gatesService: GatesService) {}

  @Get()
  public async getGates(
    @Query() filterDto: GetGatesFilterDto,
  ): Promise<Gates[]> {
    return this.gatesService.getGates(filterDto);
  }

  @Get('/:id')
  public async getGateById(@Param('id') gateId: number): Promise<Gates> {
    return this.gatesService.getGate(gateId);
  }

  @Get('/:id/report')
  public async getGateReport(
    @Param('id') gateId: number,
    @Body() reportTime: GetReportDto,
  ) {
    return this.gatesService.generateReport(gateId, reportTime);
  }

  // @Post('/add-gate')
  // @Roles(UserRoles.Admin)
  // public async addGate(@Body() createGateDto: CreateGateDto): Promise<Gates> {
  //   return this.gatesService.addGate(createGateDto);
  // }

  // @Post('/:id/assign-new-manager')
  // @Roles(UserRoles.Admin)
  // public async assignGateManager(
  //   @Param('id') id: number,
  //   @Body() gateManagerDto: GateManagerDto,
  // ): Promise<void> {
  //   return this.gatesService.assignGateManager(id, gateManagerDto);
  // }

  @Post('/:id/register-ticket/')
  @Roles(UserRoles.TerminalManager)
  public async registerPassengerTicket(
    @Body() registerTicketDto: RegisterTicketDto,
    @GetUser() user: JwtPayload,
  ) {
    return this.gatesService.registerTicket(registerTicketDto, user);
  }

  @Post('/:gateId/register-luggage')
  @Roles(UserRoles.TerminalManager)
  public async registerLuggage(@Body() luggageDto: CreateLuggageDto) {
    return this.gatesService.registerLuggage(luggageDto);
  }

  @Put('/:gateId/registered-luggage/:luggageId/update-luggage')
  @Roles(UserRoles.TerminalManager)
  public async updateLuggage(
    @Param('gateId') gateId: number,
    @Param('luggageId') luggageId: number,
    @Body() updateLuggageDto: UpdateLuggageDto,
  ) {
    return this.gatesService.updateLuggage(luggageId, updateLuggageDto);
  }

  @Put('/:gateId/registered-ticket/:ticketId/update-ticket')
  @Roles(UserRoles.TerminalManager)
  public async updateTicket(
    @Param('ticketId') ticketId: number,
    @Body() updateTicket: UpdateRegisteredTicketDto,
    @GetUser() user,
  ) {
    return this.gatesService.updateRegisteredTicket(
      ticketId,
      updateTicket,
      user,
    );
  }

  @Delete('/:gateId/registered-ticket/:ticketId/remove-ticket')
  @Roles(UserRoles.TerminalManager)
  public async removeTicket(@Param('ticketId') ticketId: number) {
    return this.gatesService.removeTicket(ticketId);
  }

  @Delete('/:gateId/registered-luggage/:luggageId/remove-luggage')
  @Roles(UserRoles.TerminalManager)
  public async removeLuggage(@Param('luggageId') luggageId: number) {
    return this.gatesService.removeLuggage(luggageId);
  }
}
