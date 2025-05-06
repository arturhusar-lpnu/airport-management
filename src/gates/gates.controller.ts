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
import { RemoveTicketDto } from 'src/tickets/dtos/remove_ticket.dto';
import { CloseRegistrationDto } from './dtos/close_registration.dto';
import { StartRegistrationDto } from './dtos/start_registration.dto';
import { SuggestionDto } from './dtos/suggestion.dto';
import { WeatherReport } from 'src/weather-api/weather.service';
import { GetFreeGatesDto } from './dtos/get_free_gates.dto';
import { GetAvailableLuggageDto } from './dtos/get-available-luggage.dto';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('gates')
export class GatesController {
  constructor(private gatesService: GatesService) {}

  @Get()
  @Roles(UserRoles.TerminalManager, UserRoles.Admin)
  public async getGates(
    @Query() filterDto: GetGatesFilterDto,
  ): Promise<Gates[]> {
    return this.gatesService.getGates(filterDto);
  }

  @Get('/:id')
  public async getGateById(@Param('id') gateId: number): Promise<Gates> {
    return this.gatesService.getGate(gateId);
  }

  @Get('/details/free-gates')
  public async getFreeFligths(@Query() dto: GetFreeGatesDto): Promise<Gates[]> {
    return this.gatesService.getFreeGates(dto);
  }

  @Get('/details/passengers')
  public async getPassengers(): Promise<Users[]> {
    return this.gatesService.getPassengers();
  }

  @Get('/:id/report')
  public async getGateReport(
    @Param('id') gateId: number,
    @Query() reportTime: GetReportDto,
  ) {
    return this.gatesService.generateReport(gateId, reportTime);
  }

  @Get('/:id/report/sugest')
  public async getSuggestion(
    @Param('id') gateId: number,
    @Query() suggestion: SuggestionDto,
  ): Promise<WeatherReport[]> {
    return this.gatesService.getSuggestion(gateId, suggestion);
  }

  @Get('/:id/registered-tickets')
  public async getRegisteredTickets(@Param('id') gateId: number) {
    return this.gatesService.getRegisteredTickets(gateId);
  }

  @Post('/:id/register-ticket/')
  @Roles(UserRoles.TerminalManager)
  public async registerPassengerTicket(
    @Body() registerTicketDto: RegisterTicketDto,
    @GetUser() user: JwtPayload,
    @Param('id') gateId: number,
  ) {
    return this.gatesService.registerTicket(gateId, registerTicketDto, user);
  }

  @Post('/:gateId/start-registration')
  @Roles(UserRoles.TerminalManager)
  public async startRegistration(
    @Param('gateId') gateId: string,
    @Body() startRegDto: StartRegistrationDto,
  ) {
    return this.gatesService.startRegistration(gateId, startRegDto);
  }

  @Put('/:gateId/close-registration')
  @Roles(UserRoles.TerminalManager)
  public async closeRegistration(
    @Param('gateId') gateId: string,
    @Body() closeRegDto: CloseRegistrationDto,
  ) {
    return this.gatesService.closeRegistration(gateId, closeRegDto);
  }

  @Get('/:gateId/register-luggage/passengers')
  @Roles(UserRoles.TerminalManager)
  public async getAvailableLuggagePassengers(
    @Param('gateId') gateId: number,
    @Query() dto: GetAvailableLuggageDto,
  ) {
    return this.gatesService.getLuggagePassengers(gateId, dto);
  }

  @Get('/:gateId/register-luggage/weight')
  @Roles(UserRoles.TerminalManager)
  public async getMaxWeight(
    @Param('gateId') gateId: number,
    @Query() dto: GetAvailableLuggageDto,
  ) {
    return this.gatesService.getMaxLuggageWeight(dto);
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
  public async removeTicket(
    @Param('ticketId') ticketId: number,
    @Body() removeTicket: RemoveTicketDto,
  ) {
    return this.gatesService.removeTicket(removeTicket);
  }

  @Delete('/:gateId/registered-luggage/:luggageId/remove-luggage')
  @Roles(UserRoles.TerminalManager)
  public async removeLuggage(@Param('luggageId') luggageId: number) {
    return this.gatesService.removeLuggage(luggageId);
  }
}
