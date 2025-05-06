import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'flight_max_luggage_weight_per_ticket',
  synchronize: false,
})
export class MaxWeight {
  @ViewColumn()
  max_weight: number;

  @ViewColumn()
  flight_number: string;

  @ViewColumn()
  flight_id: number;

  @ViewColumn()
  flight_name: string;
}
