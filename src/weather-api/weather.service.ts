import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

export interface WeatherReport {
  time: string;
  gust_kph: number;
  wind_kph: number;
  vis_km: number;
  precip_mm: number;
  cloud: number;
  condition: {
    code: number;
    text: string;
    condition: string;
  };
  chance_of_rain: number;
  chance_of_snow: number;
}

@Injectable()
export class WeatherService {
  constructor(private readonly httpService: HttpService) {}

  async getWeatherReport(datatime: Date): Promise<WeatherReport> {
    const [dateString, time] = datatime.toISOString().split('T');
    const hour = time.split(':')[0] + ':00';
    const key = '2c364996ee7d4e10be8181902252304';
    const q = 'Lviv';

    const url = `http://api.weatherapi.com/v1/forecast.json`;
    const params = {
      key,
      q,
      dt: dateString,
    };
    const response$ = this.httpService.get(url, { params });
    const response = await firstValueFrom(response$);
    const weather = response.data;
    const findDate = `${dateString} ${hour}`;
    const hourInfo = weather.forecast.forecastday[0].hour.find(
      (h: WeatherReport) => h.time == findDate,
    );

    return hourInfo;
  }

  public async sugestRearange(datatime: Date, hours: number = 12) {
    // const dataTime = new Date(datatime.setHours(datatime.getHours() + 3));
    // console.log(dataTime);
    // const dates = this.generateHourlyTimestamps(dataTime.toISOString(), hours);
    const dates = this.generateHourlyTimestamps(datatime.toISOString(), hours);
    console.log(dates[0]);
    const suitable: WeatherReport[] = [];

    for (const date of dates) {
      const weatherReport = await this.getWeatherReport(new Date(date));
      if (!this.shouldRearangeFlight(weatherReport)) {
        suitable.push(weatherReport);
      }
    }
    if (suitable.length == 0)
      throw new Error(
        `No suitable hours found from ${datatime} in ${hours} hours`,
      );

    return suitable;
  }

  private generateHourlyTimestamps(startIso: string, hours: number): string[] {
    const start = new Date(startIso);
    const result: string[] = [];

    for (let i = 0; i <= hours; i++) {
      const current = new Date(start);
      current.setHours(start.getHours() + i);
      result.push(current.toISOString());
    }

    return result;
  }

  public shouldRearangeFlight(weather: WeatherReport): boolean {
    const {
      gust_kph,
      wind_kph,
      vis_km,
      precip_mm,
      cloud,
      condition,
      chance_of_rain,
      chance_of_snow,
    } = weather;

    const unsafeTexts = ['Thunderstorm', 'Fog', 'Snow', 'Blizzard'];
    const unsafeCodes = [1087, 1135, 1210, 1276];

    return (
      gust_kph > 60 || // wind poryvy
      wind_kph > 55 || //Wind speed
      vis_km < 5 || // visibiity
      precip_mm > 5 || //Precipitation amount in millimeters kilkist osadiv
      (cloud > 90 && vis_km < 3) || // hmarky
      chance_of_rain > 50 ||
      chance_of_snow > 50 ||
      unsafeTexts.includes(condition.text) ||
      unsafeCodes.includes(condition.code)
    );
  }
}
