import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'flight_availability',
  synchronize: false,
  //expression: `SELECT * FROM flight_availability`,
})
export class FlightAvailability {
  @ViewColumn()
  id: number;

  @ViewColumn()
  flight_name: string;

  @ViewColumn()
  seats: number;

  @ViewColumn()
  ticket_count: number;

  @ViewColumn()
  available: number;
}
