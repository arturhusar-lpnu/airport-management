import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'top_airports' })
export class TopAirports {
  @ViewColumn()
  flights: number;

  @ViewColumn()
  airport_name: string;

  @ViewColumn()
  latitude: number;

  @ViewColumn()
  longitude: number;
}
