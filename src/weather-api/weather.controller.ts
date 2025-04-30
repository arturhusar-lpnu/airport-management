import { Body, Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GetReportDto } from './dtos/get_report.dto';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get('/forecast')
  public async getReport(@Query() date: GetReportDto) {
    return this.weatherService.getWeatherReport(date.to);
  }
}
