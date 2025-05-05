import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'seat_availability',
  synchronize: false,
})
export class SeatAvailability {
  @ViewColumn()
  seat_id: number;

  @ViewColumn()
  seat_number: string;

  @ViewColumn()
  flight_id: number;

  @ViewColumn()
  is_taken: boolean;

  @ViewColumn()
  passenger_id: number;
}
