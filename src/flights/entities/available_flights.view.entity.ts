import { Type } from 'class-transformer';
import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'flight_availability',
  synchronize: false,
})
export class FlightAvailability {
  @ViewColumn()
  id: number;

  @ViewColumn()
  flight_name: string;

  @ViewColumn()
  business_seats: number;

  @ViewColumn()
  economy_seats: number;

  @ViewColumn()
  @Type(() => Number)
  taken_business_seats: number;

  @ViewColumn()
  @Type(() => Number)
  taken_economy_seats: number;

  @ViewColumn()
  @Type(() => Number)
  available_business_seats: number;

  @ViewColumn()
  @Type(() => Number)
  available_economy_seats: number;

  @ViewColumn()
  seats: number;

  @ViewColumn()
  @Type(() => Number)
  ticket_count: number;

  @ViewColumn()
  available: number;
}
