import {
  Controller,
  UseGuards,
  Post,
  Body,
  Put,
  Query,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/users/roles.guard';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dtos/create-flight.dto';
import { Roles } from 'src/users/roles.decorator';
import { UserRoles } from 'src/users/user_role.enum';
import { GetFlightsFilterDto } from './dtos/get-flight-filter.dto';
import { UpdateFlighStatustDto } from './dtos/update-flight-status.dto';
import { UpdateSheduleTimeDto } from './dtos/update-shedule-time.dto';
import { Flights } from './entities/Flights.entity';
import { UpdateFlighGateDto } from './dtos/update-flight-gate.dto';

@Controller('flights')
export class FlightsController {
  constructor(private flightsService: FlightsService) {}

  @Get()
  public async getFlights(
    @Query() filterDto: GetFlightsFilterDto,
  ): Promise<Flights[]> {
    return this.flightsService.getFlights(filterDto);
  }

  @Get('/:id')
  public async getFlight(@Param('id') id: number): Promise<Flights> {
    return this.flightsService.getFlight(id);
  }

  @Get('/:id/prices')
  public async getPrices(@Param('id') id: number) {
    return this.flightsService.getPrices(id);
  }

  @Get('/:id/available-seats')
  public async getSeats(@Param('id') id: number) {
    return this.flightsService.getSeats(id);
  }

  @Post('/new-flight')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRoles.Admin)
  public async createFlight(
    @Body() createFlightDto: CreateFlightDto,
  ): Promise<Flights> {
    return this.flightsService.createFlight(createFlightDto);
  }

  @Put('/:id/update-flight/gate')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRoles.Admin)
  public async updateFlightGate(
    @Body() updateFlightGateDto: UpdateFlighGateDto,
    @Param('id') id: number,
  ): Promise<Flights> {
    return this.flightsService.updateFlightGate(id, updateFlightGateDto);
  }

  @Put('/:id/update-flight/status')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRoles.Admin)
  public async updateFlightStatus(
    @Body() updateStatusDto: UpdateFlighStatustDto,
    @Param('id') id: number,
  ): Promise<Flights> {
    return this.flightsService.updateFlightStatus(id, updateStatusDto);
  }

  @Put('/:id/update-flight/shedule-time')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRoles.Admin)
  public async updateFlightSheduleTime(
    @Body() updateTimeDto: UpdateSheduleTimeDto,
    @Param('id') id: number,
  ): Promise<Flights> {
    return this.flightsService.updateFlightSheduleTime(id, updateTimeDto);
  }

  @Delete('/:id/remove-flight')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRoles.Admin)
  public async deleteFlight(@Param('id') id: number): Promise<void> {
    return this.flightsService.deleteFlight(id);
  }
}
