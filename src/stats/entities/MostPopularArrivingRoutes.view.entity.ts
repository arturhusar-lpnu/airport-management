import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'most_popular_arriving_routes' })
export class MostPopularArrivingRoutes {
  @ViewColumn()
  airport_id: number;

  @ViewColumn()
  airport_name: string;

  @ViewColumn()
  route: string;

  @ViewColumn()
  flights_count: number;
}
